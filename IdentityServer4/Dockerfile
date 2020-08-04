FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS builder
WORKDIR /source
COPY . .

# restore for all projects
RUN dotnet restore IdentityServer4Demo.sln
# test
# use the label to identity this layer later
LABEL test=true
# install the report generator tool
RUN dotnet tool install dotnet-reportgenerator-globaltool --version 4.5.8 --tool-path /tools
# run the test and collect code coverage (requires coverlet.msbuild to be added to test project)
# for exclude, use %2c for ,
RUN dotnet test --results-directory /testresults --logger "trx;" /p:CollectCoverage=true IdentityServer4Demo.sln

RUN dotnet publish IdentityServer4Demo.sln \
    --output /app/ --configuration Debug

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=builder /app .
ENTRYPOINT ["dotnet", "IdentityServer4Demo.dll"]