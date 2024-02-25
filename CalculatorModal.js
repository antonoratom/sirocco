document.addEventListener("DOMContentLoaded", () => {
    // Get references to the elements
    const selectElementMod = document.querySelector(".select-state-mod");
    const textElementsMod = {
      stateMod: document.querySelector(".text-to-change-state-mod"),
      siroccoMod: document.querySelector(".text-to-change-sirocco-mod"),
      windMod: document.querySelector(".text-to-change-wind-mod"),
      costMod: document.querySelector(".text-to-change-cost-mod"),
      sliderMod: document.querySelector(".text-to-change-slider-mod"),
      turbinesNumberMod: document.querySelector(
        ".text-to-change-turbines-number-mod"
      ),
      turbinesCostMod: document.querySelector(
        ".text-to-change-turbines-cost-mod"
      ),
      ROIMod: document.querySelector(".text-to-change-roi-mod")
    };
    const siroccoCostElementMod = document.querySelector(".sirocco-cost");
    const siroccoElementsMod = document.querySelectorAll(
      ".sirocco-wind-speed-mod"
    );
    const stateElementsMod = document.querySelectorAll(".state-name-mod");
  
    // Function to calculate turbines needed and cost
    function updateTurbinesMod() {
      const sliderValueMod = parseFloat(textElementsMod.sliderMod.textContent);
      const siroccoValueMod = parseFloat(textElementsMod.siroccoMod.textContent);
      const turbinesNumberValueMod = sliderValueMod / siroccoValueMod;
      const roundedTurbinesNumberValueMod = Math.max(
        Math.round(turbinesNumberValueMod),
        1
      );
      const turbinesCostValueMod =
        siroccoCostElementMod.textContent * roundedTurbinesNumberValueMod;
      textElementsMod.turbinesNumberMod.textContent = roundedTurbinesNumberValueMod.toFixed(
        0
      );
      textElementsMod.turbinesCostMod.textContent = `$${turbinesCostValueMod.toFixed(
        0
      )}`;
    }
  
    // Function to update the state information
    function updateStateInformationMod(selectedValueMod) {
      let stateElementMod,
        windValueMod,
        costValueMod,
        siroccoElementMod,
        siroccoValueMod;
      for (const elementMod of stateElementsMod) {
        if (elementMod.textContent === selectedValueMod) {
          stateElementMod = elementMod;
          windValueMod = stateElementMod.nextElementSibling.textContent;
          costValueMod =
            stateElementMod.nextElementSibling.nextElementSibling.textContent;
          break;
        }
      }
      textElementsMod.stateMod.textContent = selectedValueMod;
      console.log(`stateMod updated to: ${selectedValueMod}`);
      textElementsMod.windMod.textContent = windValueMod;
      textElementsMod.costMod.textContent = costValueMod;
      for (const elementMod of siroccoElementsMod) {
        if (elementMod.textContent === windValueMod) {
          siroccoElementMod = elementMod;
          siroccoValueMod = siroccoElementMod.previousElementSibling.textContent;
          break;
        }
      }
      textElementsMod.siroccoMod.textContent = siroccoValueMod;
    }
  
    // Event listener for select element
    selectElementMod.addEventListener("change", function () {
      const selectedValueMod = selectElementMod.value;
      updateStateInformationMod(selectedValueMod);
      updateTurbinesMod();
    });
  
    // Event listener for input field
    const inputMod = document.querySelector(
      'input[name="Interactive-Slider-Input-Modal"]'
    );
    inputMod.addEventListener("input", function () {
      const valueMod = inputMod.value;
      textElementsMod.sliderMod.textContent = valueMod;
      updateTurbinesMod();
    });
  
    // add a MutationObserver to the text fields that trigger the calculation
    const observerMod = new MutationObserver(calculateROIMod);
    observerMod.observe(textElementsMod.costMod, { childList: true });
    observerMod.observe(textElementsMod.siroccoMod, { childList: true });
  
    function calculateROIMod() {
      const siroccoCostMod = Number(siroccoCostElementMod.textContent);
      const textToChangeCostMod = Number(textElementsMod.costMod.textContent);
      const textToChangeSiroccoMod = Number(
        textElementsMod.siroccoMod.textContent
      );
      const monthsInYearMod = 12;
  
      // calculate the ROI
      const ROIMod =
        siroccoCostMod /
        (textToChangeCostMod * textToChangeSiroccoMod * monthsInYearMod);
  
      // update the text element with the calculated value
      textElementsMod.ROIMod.textContent = ROIMod.toFixed(2);
    }
  
    // Select all necessary elements
    const sliderMod = document.querySelector(".text-to-change-slider-mod");
    const kwtMod = document.querySelector(".sirocco-leasing-kwt");
    const paymentMod = document.querySelector(
      ".text-to-change-monthly-payment-mod"
    );
    const costInputPercentMod = document.querySelector(
      ".text-to-change-cost-mod"
    );
    const savingPercentMod = document.querySelector(
      ".text-to-change-saving-percent-mod"
    );
    const savingYearMod = document.querySelector(
      ".text-to-change-saving-year-mod"
    );
  
    const sliderInputPercentMod = document.querySelector(
      "#interactive-slider-input-modal"
    );
    // Calculate the monthly payment and update the payment element
    const updateMonthlyPaymentMod = () => {
      const sliderValueMod = parseFloat(sliderMod.textContent);
      const kwtValueMod = parseFloat(kwtMod.textContent);
      paymentMod.textContent = (sliderValueMod * kwtValueMod).toFixed(0);
    };
  
    // Update the saving percent and saving year elements
    const updateFieldsMod = () => {
      const sliderValuePercentMod = parseInt(sliderInputPercentMod.value);
      const monthlyPaymentPercentValueMod = parseFloat(paymentMod.textContent);
      const costValuePercentMod = parseFloat(costInputPercentMod.textContent);
      const sliderCostProductMod = sliderValuePercentMod * costValuePercentMod;
      const savingPercentValueMod =
        (monthlyPaymentPercentValueMod / sliderCostProductMod - 1) * 100;
      const savingYearValueMod =
        (sliderCostProductMod - monthlyPaymentPercentValueMod) * 12;
  
      savingPercentMod.textContent = `${Math.abs(savingPercentValueMod).toFixed(
        2
      )}`;
      savingYearMod.textContent = `${savingYearValueMod.toFixed(2)}`;
    };
  
    // Call updateMonthlyPayment and updateFields initially to set the initial value
    updateMonthlyPaymentMod();
    updateFieldsMod();
  
    // Add event listeners to update the elements when user interacts with the input
    sliderInputPercentMod.addEventListener("input", () => {
      sliderMod.textContent = sliderInputPercentMod.value;
      updateMonthlyPaymentMod();
      updateFieldsMod();
    });
  
    costInputPercentMod.addEventListener("input", updateFieldsMod);
    costInputPercentMod.addEventListener("change", updateFieldsMod);
    // Add event listeners to update the elements when user interacts with the input
    selectElementMod.addEventListener("change", function () {
      const selectedValueMod = selectElementMod.value;
      updateStateInformationMod(selectedValueMod);
      updateTurbinesMod();
      updateMonthlyPaymentMod();
      updateFieldsMod();
    });
  
    textElementsMod.sliderMod.addEventListener("input", function () {
      const valueMod = textElementsMod.sliderMod.textContent;
      sliderInputPercentMod.value = valueMod;
      updateTurbinesMod();
      updateMonthlyPaymentMod();
      updateFieldsMod();
    });
  
    sliderInputPercentMod.addEventListener("input", function () {
      const valueMod = sliderInputPercentMod.value;
      textElementsMod.sliderMod.textContent = valueMod;
      updateTurbinesMod();
      updateMonthlyPaymentMod();
      updateFieldsMod();
    });
  
    textElementsMod.costMod.addEventListener("input", function () {
      updateTurbinesMod();
      updateFieldsMod();
    });
  
    textElementsMod.costMod.addEventListener("change", function () {
      updateTurbinesMod();
      updateFieldsMod();
    });
  
    //STATE SELECT CMS IN CALCULATOR AND MODAL
  
    // Select the select box for calculating
    const selectboxCalcMod = document.querySelector("#state-modal");
    // Select the select box for ordering
    const selectboxOrdMod = document.querySelector("#state-order-mod");
  
    // Select CMS Items for both calculation and ordering
    const statesMod = document.querySelectorAll(".state-name-mod");
  
    // Create options and add them to the select boxes
    statesMod.forEach((el) => {
      // Create a new option element
      let option = document.createElement("option");
  
      // Set the option text and value to the state name
      option.text = el.innerText;
      option.value = el.innerText;
  
      // Add the option to both select boxes
      selectboxCalcMod.add(option);
      selectboxOrdMod.add(option.cloneNode(true));
    });
  
    // MIRROR INPUT FOR RANGE SLIDER & STATE
  
    // Get references to the select fields and input fields
    const stateSelectMod = document.getElementById("state-modal");
    const stateOrderSelectMod = document.getElementById("state-order-mod");
    const interactiveSliderInputMod = document.getElementById(
      "interactive-slider-input-modal"
    );
    const elConsumptionOrderInputMod = document.getElementById(
      "El-consumption-order-mod"
    );
  
    // Add an event listener to the state select field
    stateSelectMod.addEventListener("change", () => {
      // Get the currently selected option
      const selectedOptionMod =
        stateSelectMod.options[stateSelectMod.selectedIndex];
  
      // Loop through the options in the state order select field
      for (let i = 0; i < stateOrderSelectMod.options.length; i++) {
        const option = stateOrderSelectMod.options[i];
  
        // If the value of the current option matches the value of the selected option
        if (option.value === selectedOptionMod.value) {
          // Set the state order select field to the current option
          stateOrderSelectMod.selectedIndex = i;
          break;
        }
      }
    });
  
    // Add an event listener to the interactive slider input field
    interactiveSliderInputMod.addEventListener("input", () => {
      // Set the value of the el consumption order input field to the value of the interactive slider input field
      elConsumptionOrderInputMod.value = interactiveSliderInputMod.value;
    });
  
    // MIRROR INPUT FOR RADIOBUTTONS & ACTIVE STATES FOR RADIOBUTTONS
  
    // Get references to the purchase and leasing blocks
    const purchaseBlockMod = document.getElementById("Purchase-modal");
    const purchaseOrderBlockMod = document.getElementById("Purchase-order-mod");
    const leasingBlockMod = document.getElementById("Leasing-modal");
    const leasingOrderBlockMod = document.getElementById("Leasing-order-mod");
  
    // Add a click event listener to the purchase block
    purchaseBlockMod.addEventListener("click", () => {
      // Simulate a click on the purchase order block
      purchaseOrderBlockMod.click();
    });
  
    // Add a click event listener to the leasing block
    leasingBlockMod.addEventListener("click", () => {
      // Simulate a click on the leasing order block
      leasingOrderBlockMod.click();
    });
  
    // get references to the #Leasing and #Purchase elements
    const leasingBlockClickMod = document.querySelector("#Leasing-modal");
    const purchaseBlockClickMod = document.querySelector("#Purchase-modal");
  
    // add event listeners for when the blocks are clicked
    leasingBlockClickMod.addEventListener("click", () => {
      // add the .active class to the leasing block and remove it from the purchase block
      leasingBlockClickMod.classList.add("active");
      purchaseBlockClickMod.classList.remove("active");
  
      // Show leasing divs and hide purchase divs
      purchaseDivsMod.forEach((div) => (div.style.display = "none"));
      leasingDivsMod.forEach((div) => (div.style.display = "block"));
    });
  
    purchaseBlockClickMod.addEventListener("click", () => {
      // add the .active class to the purchase block and remove it from the leasing block
      purchaseBlockClickMod.classList.add("active");
      leasingBlockClickMod.classList.remove("active");
  
      // Show purchase divs and hide leasing divs
      leasingDivsMod.forEach((div) => (div.style.display = "none"));
      purchaseDivsMod.forEach((div) => (div.style.display = "block"));
    });
  
    const purchaseRadioMod = document.querySelector("#Purchase-modal");
    const leasingRadioMod = document.querySelector("#Leasing-modal");
    const purchaseDivsMod = document.querySelectorAll(
      ".purchase-mod, .purchaces-results-wrap"
    );
    const leasingDivsMod = document.querySelectorAll(
      ".leasing-mod, .leasing-results-wrap"
    );
  
    // Hide purchase and leasing divs by default
    purchaseDivsMod.forEach((div) => (div.style.display = "none"));
    leasingDivsMod.forEach((div) => (div.style.display = "none"));
  
    // Add event listeners to radio buttons
    purchaseRadioMod.addEventListener("click", () => {
      // Show purchase divs and hide leasing divs
      purchaseDivsMod.forEach((div) => (div.style.display = "block"));
      leasingDivsMod.forEach((div) => (div.style.display = "none"));
    });
  
    leasingRadioMod.addEventListener("click", () => {
      // Show leasing divs and hide purchase divs
      leasingDivsMod.forEach((div) => (div.style.display = "block"));
      purchaseDivsMod.forEach((div) => (div.style.display = "none"));
    });
  
    // ERROR MESSAGE IF NO STATE OR PURCHASE TYPE IS SELECTED
  
    $(document).ready(function () {
      $("#first-step-mod").prop("disabled", true);
      $("#state-additional-mod").hide();
      $("#third-step-mod").prop("disabled", true);
  
      $("#state-modal").on("change", function () {
        if ($(this).val() !== "") {
          $("#first-step-mod")
            .prop("disabled", false)
            .addClass("active")
            .attr("fs-mirrorclick-element", "trigger-21");
          $(this)
            .siblings(".error-message")
            .stop()
            .animate(
              {
                opacity: 0
              },
              200,
              "linear",
              function () {
                $(this).addClass("hide-error").removeClass("show");
              }
            );
          $("#state-additional-mod").show();
        } else {
          $("#first-step-mod")
            .prop("disabled", true)
            .removeClass("active")
            .removeAttr("fs-mirrorclick-element");
          if ($(this).siblings(".error-message").hasClass("show")) {
            $(this).siblings(".error-message").css("opacity", 1);
          } else {
            $(this)
              .siblings(".error-message")
              .stop()
              .animate(
                {
                  opacity: 1
                },
                200,
                "linear",
                function () {
                  $(this).removeClass("hide-error").addClass("show");
                }
              );
          }
          $("#state-additional-mod").hide();
        }
      });
  
      $('[name="fin-option-mod"]').on("change", function () {
        if ($('[name="fin-option-mod"]:checked').length > 0) {
          $("#third-step-mod")
            .prop("disabled", false)
            .addClass("active")
            .attr("fs-mirrorclick-element", "trigger-23");
          $(this)
            .siblings(".error-message")
            .stop()
            .animate(
              {
                opacity: 0
              },
              200,
              "linear",
              function () {
                $(this).addClass("hide-error").removeClass("show");
              }
            );
        } else {
          $("#third-step-mod")
            .prop("disabled", true)
            .removeClass("active")
            .removeAttr("fs-mirrorclick-element");
          if ($(this).siblings(".error-message").hasClass("show")) {
            $(this).siblings(".error-message").css("opacity", 1);
          } else {
            $(this)
              .siblings(".error-message")
              .stop()
              .animate(
                {
                  opacity: 1
                },
                200,
                "linear",
                function () {
                  $(this).removeClass("hide-error").addClass("show");
                }
              );
          }
        }
      });
  
      $("#first-step-mod, #third-step-mod").on("click", function (e) {
        if ($(this).prop("disabled")) {
          e.preventDefault();
          if ($(this).siblings(".error-message").hasClass("show")) {
            return;
          }
          $(this)
            .siblings(".error-message")
            .stop()
            .animate(
              {
                opacity: 1
              },
              200,
              "linear",
              function () {
                $(this).removeClass("hide-error").addClass("show");
                setTimeout(
                  function () {
                    $(this)
                      .stop()
                      .animate(
                        {
                          opacity: 0
                        },
                        200,
                        "linear",
                        function () {
                          $(this).addClass("hide-error").removeClass("show");
                        }
                      );
                  }.bind(this),
                  2000
                );
              }
            );
        }
      });
    });
  
    // CTA GO BACK
    const backButtonToResult = document.querySelector("#back-to-results-mod");
    const backButtonToFinMod = document.querySelector("#back-to-fin-mod");
    const backButtonToElMod = document.querySelector("#back-to-el-mod");
    const backButtonToStateMod = document.querySelector("#back-to-state-mod");
  
    const resultMod = document.querySelector("#result-mod");
    const finOptionMod = document.querySelector("#fin-option-mod");
    const elConsMod = document.querySelector("#el-cons-mod");
    const stateIdMod = document.querySelector("#state-id-mod");
  
    backButtonToResult.addEventListener("click", () => {
      resultMod.click();
    });
  
    backButtonToFinMod.addEventListener("click", () => {
      finOptionMod.click();
    });
  
    backButtonToElMod.addEventListener("click", () => {
      elConsMod.click();
    });
  
    backButtonToStateMod.addEventListener("click", () => {
      stateIdMod.click();
    });
  });
  