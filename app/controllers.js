/**
 * Created by madongfang on 2016/9/1.
 */

appControllers = angular.module("appControllers", ["ui.router"]);

appControllers.controller("LoginController", ["$scope", "md5", "$state", "ApiLogin",
    function ($scope, md5, $state, ApiLogin) {
        $scope.doLogin = function (username, password) {
            ApiLogin.exec({username: username, password: md5.createHash(password)},
                function (data) {
                    $state.go("main.circulations");
                },
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        };
    }
]);

appControllers.controller("MainController", ["$scope", "$state", "ApiLogout", "ApiUser",
    function ($scope, $state, ApiLogout, ApiUser) {
        $scope.loginUser = ApiUser.get({userId:0},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.doLogout = function () {
            ApiLogout.exec();
        };
    }
]);

appControllers.controller("CirculationsController", ["$scope", "ApiCirculation",
    function ($scope, ApiCirculation) {
        $scope.circulations = ApiCirculation.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteCirculation = function (circulation)
        {
            if (confirm("确定删除该流转单?"))
            {
                circulation.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };

        $scope.export = function (circulationId)
        {
            var url = testServerAddr + "api/circulations/"+circulationId+"/export";
            window.open(url, "_self");
        };
    }
]);

appControllers.controller("CirculationConfigController", ["$scope", "$state", "ApiCirculation", "$stateParams", "ApiCertificate",
    function ($scope, $state, ApiCirculation, $stateParams, ApiCertificate) {
        $scope.select = {certificate:null};
        $scope.certificates = ApiCertificate.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.circulation = {number:"", certificateUnit:"",certificateAddress:""};

        var circulationId = $stateParams.circulationId;
        if (circulationId != 0)
        {
            $scope.circulation = ApiCirculation.get({circulationId:circulationId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configCirculation = function ()
        {
            if (circulationId == 0)
            {
                ApiCirculation.create(null, $scope.circulation,
                    function (data)
                    {
                        $state.go("main.measures", {circulationId:data.id});
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.circulation.$update(
                    function (data)
                    {
                        $state.go("main.measures", {circulationId:data.id});
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };

        $scope.selectCertificate = function ()
        {
            $scope.circulation.certificateUnit = $scope.select.certificate.unit;
            $scope.circulation.certificateAddress = $scope.select.certificate.address;
        };
    }
]);

appControllers.controller("CertificatesController", ["$scope", "ApiCertificate",
    function ($scope, ApiCertificate) {
        $scope.certificates = ApiCertificate.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteCertificate = function (certificate)
        {
            if (confirm("确定删除该证书?"))
            {
                certificate.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }

        };
    }
]);

appControllers.controller("CertificateConfigController", ["$scope", "$state", "ApiCertificate", "$stateParams",
    function ($scope, $state, ApiCertificate, $stateParams) {
        $scope.certificate = {unit:"",address:""};

        var certificateId = $stateParams.certificateId;
        if (certificateId != 0)
        {
            $scope.certificate = ApiCertificate.get({certificateId:certificateId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configCertificate = function ()
        {
            if (certificateId == 0)
            {
                ApiCertificate.create(null, $scope.certificate,
                    function (data)
                    {
                        $state.go("main.certificates");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.certificate.$update(
                    function (data)
                    {
                        $state.go("main.certificates");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("ModelsController", ["$scope", "ApiModel",
    function ($scope, ApiModel) {
        $scope.models = ApiModel.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteModel = function (model)
        {
            if (confirm("确定删除该型号?"))
            {
                model.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }

        };
    }
]);

appControllers.controller("ModelConfigController", ["$scope", "$state", "ApiModel", "$stateParams",
    function ($scope, $state, ApiModel, $stateParams) {
        $scope.model = {name:""};

        var modelId = $stateParams.modelId;
        if (modelId != 0)
        {
            $scope.model = ApiModel.get({modelId:modelId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configModel = function ()
        {
            if (modelId == 0)
            {
                ApiModel.create(null, $scope.model,
                    function (data)
                    {
                        $state.go("main.models");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.model.$update(
                    function (data)
                    {
                        $state.go("main.models");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("ReferencesController", ["$scope", "ApiReference",
    function ($scope, ApiReference) {
        $scope.references = ApiReference.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteReference = function (reference)
        {
            if (confirm("确定删除该依据?"))
            {
                reference.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }

        };
    }
]);

appControllers.controller("ReferenceConfigController", ["$scope", "$state", "ApiReference", "$stateParams",
    function ($scope, $state, ApiReference, $stateParams) {
        $scope.reference = {name:""};

        var referenceId = $stateParams.referenceId;
        if (referenceId != 0)
        {
            $scope.reference = ApiReference.get({referenceId:referenceId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configReference = function ()
        {
            if (referenceId == 0)
            {
                ApiReference.create(null, $scope.reference,
                    function (data)
                    {
                        $state.go("main.references");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.reference.$update(
                    function (data)
                    {
                        $state.go("main.references");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("ManufacturersController", ["$scope", "ApiManufacturer",
    function ($scope, ApiManufacturer) {
        $scope.manufacturers = ApiManufacturer.query(
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteManufacturer = function (manufacturer)
        {
            if (confirm("确定删除该依据?"))
            {
                manufacturer.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }

        };
    }
]);

appControllers.controller("ManufacturerConfigController", ["$scope", "$state", "ApiManufacturer", "$stateParams",
    function ($scope, $state, ApiManufacturer, $stateParams) {
        $scope.manufacturer = {name:""};

        var manufacturerId = $stateParams.manufacturerId;
        if (manufacturerId != 0)
        {
            $scope.manufacturer = ApiManufacturer.get({manufacturerId:manufacturerId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configManufacturer = function ()
        {
            if (manufacturerId == 0)
            {
                ApiManufacturer.create(null, $scope.manufacturer,
                    function (data)
                    {
                        $state.go("main.manufacturers");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.manufacturer.$update(
                    function (data)
                    {
                        $state.go("main.manufacturers");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("StandardsController", ["$scope", "ApiStandard",
    function ($scope, ApiStandard) {
        $scope.standards = ApiStandard.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteStandard = function (standard)
        {
            if (confirm("确定删除该标准器?"))
            {
                standard.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("StandardConfigController", ["$scope", "$state", "ApiStandard", "$stateParams",
    function ($scope, $state, ApiStandard, $stateParams) {
        $scope.standard = {name:"",number:"",accuracy:"",certificateNumber:""};

        var standardId = $stateParams.standardId;
        if (standardId != 0)
        {
            $scope.standard = ApiStandard.get({standardId:standardId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configStandard = function ()
        {
            if (standardId == 0)
            {
                ApiStandard.create(null, $scope.standard,
                    function (data)
                    {
                        $state.go("main.standards");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.standard.$update(
                    function (data)
                    {
                        $state.go("main.standards");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("MeasuresController", ["$scope", "$stateParams", "ApiMeasure", "ApiCirculation",
    function ($scope, $stateParams, ApiMeasure, ApiCirculation) {
        $scope.circulationId = $stateParams.circulationId;
        $scope.circulation = ApiCirculation.get({circulationId:$stateParams.circulationId},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.measures = ApiMeasure.query({circulationId:$stateParams.circulationId},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteMeasure = function (measure)
        {
            if (confirm("确定删除该检测?"))
            {
                measure.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("MeasureConfigController", ["$scope", "$stateParams", "$state", "ApiMeasure", "ApiModel", "ApiStandard", "ApiReference", "ApiData", "ApiManufacturer",
    function ($scope, $stateParams, $state, ApiMeasure, ApiModel, ApiStandard, ApiReference, ApiData, ApiManufacturer) {
        var measureId = $stateParams.measureId;
        $scope.select = {standard1:null,standard2:null,standard3:null};
        $scope.circulationId = $stateParams.circulationId;
        $scope.reportTypes = [{id:1, label:"检定"}, {id:2, label:"校准"}];
        $scope.decimalDigits = [{value:0},{value:1},{value:2},{value:3},{value:4}];
        $scope.units = [{name:"Nm"},{name:"kgfcm"},{name:"lbfft"},{name:"cNm"},{name:"ozfin"},{name:"lbfin"},{name:"gfcm"}];
        $scope.references = ApiReference.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );
        $scope.standards = ApiStandard.query({},
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );
        $scope.models = ApiModel.query(
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );
        $scope.manufacturers = ApiManufacturer.query(
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );
        $scope.measure = ApiMeasure.get({measureId:measureId},
            function (data) {},
            function (response) {
                $scope.measure = {address:"", reportType:1,decimalDigits:2,unit1:"Nm",type:"示值式",direction:"水平试验状态"};
            }
        );

        $scope.datas = ApiData.query({measureId:measureId},
            function (datas)
            {
                for (var i = 0; i < datas.length; i++)
                {
                    var factor = 1;
                    for (var j = 0; j < datas[i].decimalDigit; j++)
                    {
                        factor = factor * 10;
                    }
                    datas[i].displayValue1 = datas[i].value1 / factor;
                    datas[i].displayValue2 = datas[i].value2 / factor;
                    datas[i].displayValue3 = datas[i].value3 / factor;
                    datas[i].displayBaseValue0 = datas[i].baseValue0 / factor;
                    datas[i].displayBaseValue = datas[i].baseValue / factor;
                }
            },
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.configMeasure = function ()
        {
            if (measureId == 0)
            {
                $scope.measure.circulationId = $stateParams.circulationId;
                ApiMeasure.create(null, $scope.measure,
                    function (measure)
                    {
                        var dataIds = [];
                        for (var i = 0; i < $scope.datas.length; i++)
                        {
                            dataIds.push($scope.datas[i].id);
                        }
                        ApiMeasure.addDatas({measureId:measure.id}, dataIds,
                            function (data)
                            {
                                $state.go("main.measures", {circulationId:$stateParams.circulationId});
                            },
                            function (response) {
                                alert(response.data.returnMsg);
                            }
                        );
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.measure.$update(
                    function (data)
                    {
                        $state.go("main.measures", {circulationId:$stateParams.circulationId});
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };

        $scope.selectStandard = function (number)
        {
            var standard = $scope.select["standard"+number];
            $scope.measure["standardName"+number] = standard.name;
            $scope.measure["standardNumber"+number] = standard.number;
            $scope.measure["standardAccuracy"+number] = standard.accuracy;
            $scope.measure["standardCertificateNumber"+number] = standard.certificateNumber;
        };
    }
]);

appControllers.controller("UsersController", ["$scope", "ApiUser",
    function ($scope, ApiUser) {
        $scope.users = ApiUser.query(
            function (data) {},
            function (response) {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteUser = function (user)
        {
            if (confirm("确定删除该用户?"))
            {
                user.$delete(
                    function (data)
                    {
                        location.reload();
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }

        };
    }
]);

appControllers.controller("UserConfigController", ["$scope", "$state", "$stateParams", "ApiUser", "md5",
    function ($scope, $state, $stateParams, ApiUser, md5) {
        $scope.user = {username:"", password:"", name:"", level:2};

        var userId = $stateParams.userId;
        if (userId == 0)
        {
            $scope.title = "新增用户";
        }
        else
        {
            $scope.title = "修改用户";
            $scope.user = ApiUser.get({userId:userId},
                function (data) {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.configUser = function ()
        {
            if ($scope.user.password)
            {
                $scope.user.password = md5.createHash($scope.user.password);
            }

            if (userId == 0)
            {
                ApiUser.create(null, $scope.user,
                    function (data)
                    {
                        $state.go("main.users");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else
            {
                $scope.user.$update(
                    function (data)
                    {
                        $state.go("main.users");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);
