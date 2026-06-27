(function ($) {
    var previouslyclicked = false;
    var items = [];

    $.extend(true, epi.EPiServer.Forms.Dependency.Actions, {
        CustomformAction: function ( controller) {
            var elementName = controller.dependantInfo.fieldName;
            var $wrapperElement = $('[data-f-element-name="' + elementName + '"]', controller.workingFormInfo.$workingForm);
            var $inputElement = $('[data-f-datainput]', $wrapperElement); 


            controller.workingFormInfo.$workingForm.on('reset', function (event) {
                previouslyclicked = false; 
            });

            var dependencyInfo = getDependencyInfo(controller.workingFormInfo, controller.dependantInfo.fieldName);

            if (!dependencyInfo) {
                return;
            }

            
            for (let i = 0; i < controller.dependantInfo.conditions.length; i++) {
                var $wrapperElementonchange = $('[data-f-element-name="' + controller.dependantInfo.conditions[i].fieldName + '"]', controller.workingFormInfo.$workingForm);
                var $inputElementonchange = $('[data-f-datainput]', $wrapperElementonchange);

                items[i] = -1;


                for (let j = 0; j < $inputElementonchange.length; j++) {


                    $inputElementonchange[j].addEventListener('change', function (event) {
                        
                        if (shouldshowmodal(controller.dependantInfo.conditions[controller.dependantInfo.conditions.length - 1])) {
                            document.getElementById(controller.dependantInfo.conditions[controller.dependantInfo.conditions.length - 1].fieldValue).open()
                            
                            let $wrapperElementonchange1 = $('[data-f-element-name="' + controller.dependantInfo.conditions[i].fieldName + '"]', controller.workingFormInfo.$workingForm);
                            let $inputElementonchange1 = $('[data-f-datainput]', $wrapperElementonchange1);


                            setInputChecked($inputElementonchange1[items[i]], true); 
                        }
                        else {
                            items[i] = j;
                        }
                       
                    });
                }
            }

            if (controller.isSatisfied) {
                $inputElement.addClass('bg-red');
            } else {
                $inputElement.removeClass('bg-red');
            }
        }
    });

    function setInputChecked(inputElement, checked) {

        inputElement.checked = checked;
        previouslyclicked = false;

        var event = new Event('change', {
            bubbles: true,
            cancelable: true
        });

        
        // Dispatch the event
        inputElement.dispatchEvent(event);
    }

    function shouldshowmodal(condition, workingFormInfo) {
        if (condition) {
            var $CondtionwrapperElement = $('[data-f-element-name="' + condition.fieldName + '"]', workingFormInfo);
            var $ConditioninputElement = $('[data-f-datainput]', $CondtionwrapperElement);
            if ($ConditioninputElement) {
                for (var k = 0; k < $ConditioninputElement.length; k++) {
                    if ($ConditioninputElement[k].checked) {
                        if (previouslyclicked) {
                            previouslyclicked = false;
                            return true;
                        }
                        previouslyclicked = true;
                        return false;
                    }
                }
            }
        }
        return false;
    }

    // get dependency infor of a field
    function getDependencyInfo(workingFormInfo, fieldName) {
        var dependencies = workingFormInfo.DependenciesInfo;
        if (!dependencies || dependencies.length === 0) {
            return null;
        }

        for (var i = 0; i < dependencies.length; i++) {
            if (dependencies[i].fieldName === fieldName) {
                return dependencies[i];
            }
        }

        return null;
    }


})($$epiforms || $);