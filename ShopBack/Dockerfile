#FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS builder
#WORKDIR /source
#COPY . .
#
## restore for all projects
#RUN dotnet restore Shop.sln
## test
## use the label to identity this layer later
#LABEL test=true
## install the report generator tool
#RUN dotnet tool install dotnet-reportgenerator-globaltool --version 4.5.8 --tool-path /tools
## run the test and collect code coverage (requires coverlet.msbuild to be added to test project)
## for exclude, use %2c for ,
#RUN dotnet test --results-directory /testresults --logger "trx;" /p:CollectCoverage=true Shop.sln
#
#RUN dotnet publish Shop.sln \
#    --output /app/ --configuration Debug
#
#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
#WORKDIR /app
#COPY --from=builder /app .
#ENV ASPNETCORE_ENVIRONMENT=Development \
#    ASPNETCORE_URLS=http://+:80
#ENTRYPOINT ["dotnet", "Shop.dll"]
#



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
ENV DOCKERIZE_VERSION v0.6.1
RUN apt-get update && apt-get install -y wget
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
COPY --from=builder /app .
#ENV ASPNETCORE_ENVIRONMENT=Development \
#    ASPNETCORE_URLS=http://+:80 \
#ENTRYPOINT ["dotnet", "Shop.dll"]
CMD dotnet Shop.dll

EXPOSE 80