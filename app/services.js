/**
 * Created by madongfang on 2016/9/1.
 */

var restfulApiService = angular.module("restfulApiService", ["ngResource"]);

restfulApiService.config(["$resourceProvider",
    function ($resourceProvider)
    {
        $resourceProvider.defaults.actions = {
            get: {method: 'GET', withCredentials: true},
            create: {method: 'POST', withCredentials: true},
            exec: {method: 'POST', withCredentials: true},
            query: {method: 'GET', isArray: true, withCredentials: true},
            update: {method: 'PUT', withCredentials: true},
            delete: {method: 'DELETE', withCredentials: true}
        };
    }
]);

restfulApiService.factory("ApiLogin", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/login");
    }
]);

restfulApiService.factory("ApiLogout", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/logout");
    }
]);

restfulApiService.factory("ApiCirculation", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/circulations/:circulationId", {circulationId:"@id"});
    }
]);

restfulApiService.factory("ApiCertificate", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/certificates/:certificateId", {certificateId:"@id"});
    }
]);

restfulApiService.factory("ApiStandard", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/standards/:standardId", {standardId:"@id"});
    }
]);

restfulApiService.factory("ApiReference", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/references/:referenceId", {referenceId:"@id"});
    }
]);

restfulApiService.factory("ApiManufacturer", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/manufacturers/:manufacturerId", {manufacturerId:"@id"});
    }
]);

restfulApiService.factory("ApiModel", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/models/:modelId", {modelId:"@id"});
    }
]);

restfulApiService.factory("ApiMeasure", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/measures/:measureId", {measureId:"@id"},
            {
                addDatas:{method:"POST", url:testServerAddr + "api/measures/:measureId/addDatas", withCredentials: true}
            }
        );
    }
]);

restfulApiService.factory("ApiData", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/datas/:dataId", {dataId:"@id"});
    }
]);

restfulApiService.factory("ApiUser", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/users/:userId", {userId:"@id"});
    }
]);

var toolService = angular.module("toolService", []);

toolService.factory("Random", function () {
        return {
            getString: function (len) {
                len = len || 32;
                var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                var maxPos = chars.length;
                var randomString = "";
                for (i = 0; i < len; i++) {
                    randomString += chars.charAt(Math.floor(Math.random() * maxPos));
                }
                return randomString;
            }
        };
    }
);
