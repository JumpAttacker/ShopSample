FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS builder
WORKDIR /source
COPY . .

# restore for all projects
RUN dotnet restore Shop.sln
# test
# use the label to identity this layer later
LABEL test=true
# install the report generator tool
RUN dotnet tool install dotnet-reportgenerator-globaltool --version 4.5.8 --tool-path /tools
# run the test and collect code coverage (requires coverlet.msbuild to be added to test project)
# for exclude, use %2c for ,
RUN dotnet test --results-directory /testresults --logger "trx;" /p:CollectCoverage=true Shop.sln

RUN dotnet publish Shop.sln \
    --output /app/ --configuration Debug

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=builder /app .
ENV ASPNETCORE_ENVIRONMENT=Development \
    ASPNETCORE_URLS=http://+:80 \
	Auth__Authority=http://localhost:5000/ \
	Auth__Audience=microservice \
	UrlPrefix=paymentsapi \
	ConnectionStrings__DefaultConnection=connstring
ENTRYPOINT ["dotnet", "Shop.dll"]