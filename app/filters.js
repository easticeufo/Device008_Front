appFilters = angular.module("appFilters", []);

appFilters.filter("reportType", function ()
{
    return function (input)
    {
        if (input == 1)
        {
            return "检定";
        }
        else if (input == 2)
        {
            return "校准";
        }
        else
        {
            return input;
        }
    }
});
