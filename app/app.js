/**
 * Created by madongfang on 2016/9/1.
 */

//testServerAddr = "http://localhost:8082/"; // 开发测试时使用
//testServerAddr = "http://www.yjm2m.com:8080/Manager/"; // 开发测试时使用
testServerAddr = ""; // 发布时使用

var eastApp = angular.module("eastApp", ["ui.router", "restfulApiService", "appControllers", "appFilters", "toolService",
    "userLogin", "ui.bootstrap", "angular-md5", "ui.select"]);

eastApp.config(["$stateProvider", "$urlRouterProvider", "$locationProvider",
    function ($stateProvider, $urlRouterProvider, $locationProvider)
    {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("login", {
                url: "/login",
                template: "<user-login do-login='doLogin(username, password)'></user-login>",
                controller: "LoginController"
            })
            .state("main", {
                url: "/main",
                templateUrl: "templates/main.html",
                controller: "MainController"
            })
            .state("main.circulations", {
                url: "/circulations",
                templateUrl: "templates/circulations.html",
                controller: "CirculationsController"
            })
            .state("main.circulationConfig", {
                url: "/circulations/{circulationId}",
                templateUrl: "templates/circulationConfig.html",
                controller: "CirculationConfigController"
            })
            .state("main.certificates", {
                url: "/certificates",
                templateUrl: "templates/certificates.html",
                controller: "CertificatesController"
            })
            .state("main.certificateConfig", {
                url: "/certificates/{certificateId}",
                templateUrl: "templates/certificateConfig.html",
                controller: "CertificateConfigController"
            })
            .state("main.standards", {
                url: "/standards",
                templateUrl: "templates/standards.html",
                controller: "StandardsController"
            })
            .state("main.standardConfig", {
                url: "/standards/{standardId}",
                templateUrl: "templates/standardConfig.html",
                controller: "StandardConfigController"
            })
            .state("main.models", {
                url: "/models",
                templateUrl: "templates/models.html",
                controller: "ModelsController"
            })
            .state("main.modelConfig", {
                url: "/models/{modelId}",
                templateUrl: "templates/modelConfig.html",
                controller: "ModelConfigController"
            })
            .state("main.references", {
                url: "/references",
                templateUrl: "templates/references.html",
                controller: "ReferencesController"
            })
            .state("main.referenceConfig", {
                url: "/references/{referenceId}",
                templateUrl: "templates/referenceConfig.html",
                controller: "ReferenceConfigController"
            })
            .state("main.manufacturers", {
                url: "/manufacturers",
                templateUrl: "templates/manufacturers.html",
                controller: "ManufacturersController"
            })
            .state("main.manufacturerConfig", {
                url: "/manufacturers/{manufacturerId}",
                templateUrl: "templates/manufacturerConfig.html",
                controller: "ManufacturerConfigController"
            })
            .state("main.measures", {
                url: "/circulations/{circulationId}/measures",
                templateUrl: "templates/measures.html",
                controller: "MeasuresController"
            })
            .state("main.measureConfig", {
                url: "/circulations/{circulationId}/measures/{measureId}",
                templateUrl: "templates/measureConfig.html",
                controller: "MeasureConfigController"
            })
            .state("main.users", {
                url: "/users",
                templateUrl: "templates/users.html",
                controller: "UsersController"
            })
            .state("main.userConfig", {
                url: "/users/{userId}",
                templateUrl: "templates/userConfig.html",
                controller: "UserConfigController"
            });
    }
]);
