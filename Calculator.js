// Get references to the elements
const selectElement = document.querySelector(".select-state");
const textElements = {
  state: document.querySelector(".text-to-change-state"),
  sirocco: document.querySelector(".text-to-change-sirocco"),
  wind: document.querySelector(".text-to-change-wind"),
  cost: document.querySelector(".text-to-change-cost"),
  slider: document.querySelector(".text-to-change-slider"),
  turbinesNumber: document.querySelector(".text-to-change-turbines-number"),
  turbinesCost: document.querySelector(".text-to-change-turbines-cost"),
  ROI: document.querySelector(".text-to-change-roi"),
};
const siroccoCostElement = document.querySelector(".sirocco-cost");
const siroccoElements = document.querySelectorAll(".sirocco-wind-speed");
const stateElements = document.querySelectorAll(".state-name");

// Function to calculate turbines needed and cost
function updateTurbines() {
  const sliderValue = parseFloat(textElements.slider.textContent);
  const siroccoValue = parseFloat(textElements.sirocco.textContent);
  const turbinesNumberValue = sliderValue / siroccoValue;
  const roundedTurbinesNumberValue = Math.max(
    Math.round(turbinesNumberValue),
    1
  );
  const turbinesCostValue =
    siroccoCostElement.textContent * roundedTurbinesNumberValue;
  textElements.turbinesNumber.textContent =
    roundedTurbinesNumberValue.toFixed(0);
  textElements.turbinesCost.textContent = `$${turbinesCostValue.toFixed(0)}`;
}

// Function to update the state information
function updateStateInformation(selectedValue) {
  let stateElement, windValue, costValue, siroccoElement, siroccoValue;
  for (const element of stateElements) {
    if (element.textContent === selectedValue) {
      stateElement = element;
      windValue = stateElement.nextElementSibling.textContent;
      costValue =
        stateElement.nextElementSibling.nextElementSibling.textContent;
      break;
    }
  }
  textElements.state.textContent = selectedValue;
  textElements.wind.textContent = windValue;
  textElements.cost.textContent = costValue;
  for (const element of siroccoElements) {
    if (element.textContent === windValue) {
      siroccoElement = element;
      siroccoValue = siroccoElement.previousElementSibling.textContent;
      break;
    }
  }
  textElements.sirocco.textContent = siroccoValue;
}

// Event listener for select element
selectElement.addEventListener("change", function () {
  const selectedValue = selectElement.value;
  updateStateInformation(selectedValue);
  updateTurbines();
});

// Event listener for input field
const input = document.querySelector('input[name="interactive-slider-input"]');
input.addEventListener("input", function () {
  const value = input.value;
  textElements.slider.textContent = value;
  updateTurbines();
});

// add a MutationObserver to the text fields that trigger the calculation
const observer = new MutationObserver(calculateROI);
observer.observe(textElements.cost, { childList: true });
observer.observe(textElements.sirocco, { childList: true });

function calculateROI() {
  const siroccoCost = Number(siroccoCostElement.textContent);
  const textToChangeCost = Number(textElements.cost.textContent);
  const textToChangeSirocco = Number(textElements.sirocco.textContent);
  const monthsInYear = 12;

  // calculate the ROI
  const ROI =
    siroccoCost / (textToChangeCost * textToChangeSirocco * monthsInYear);

  // update the text element with the calculated value
  textElements.ROI.textContent = ROI.toFixed(2);
}

// Select all necessary elements
const slider = document.querySelector(".text-to-change-slider");
const kwt = document.querySelector(".sirocco-leasing-kwt");
const payment = document.querySelector(".text-to-change-monthly-payment");
const costInputPercent = document.querySelector(".text-to-change-cost");
const savingPercent = document.querySelector(".text-to-change-saving-percent");
const savingYear = document.querySelector(".text-to-change-saving-year");
const sliderInputPercent = document.querySelector("#interactive-slider-input");

// Calculate the monthly payment and update the payment element
const updateMonthlyPayment = () => {
  const sliderValue = parseFloat(slider.textContent);
  const kwtValue = parseFloat(kwt.textContent);
  payment.textContent = (sliderValue * kwtValue).toFixed(0);
};

// Update the saving percent and saving year elements
const updateFields = () => {
  const sliderValuePercent = parseInt(sliderInputPercent.value);
  const monthlyPaymentPercentValue = parseFloat(payment.textContent);
  const costValuePercent = parseFloat(costInputPercent.textContent);
  const sliderCostProduct = sliderValuePercent * costValuePercent;
  const savingPercentValue =
    (monthlyPaymentPercentValue / sliderCostProduct - 1) * 100;
  const savingYearValue = (sliderCostProduct - monthlyPaymentPercentValue) * 12;

  savingPercent.textContent = `${Math.abs(savingPercentValue).toFixed(2)}`;
  savingYear.textContent = `${savingYearValue.toFixed(2)}`;
};

// Call updateMonthlyPayment and updateFields initially to set the initial value
updateMonthlyPayment();
updateFields();

// Add event listeners to update the elements when user interacts with the input
sliderInputPercent.addEventListener("input", () => {
  slider.textContent = sliderInputPercent.value;
  updateMonthlyPayment();
  updateFields();
});

costInputPercent.addEventListener("input", updateFields);
costInputPercent.addEventListener("change", updateFields);
// Add event listeners to update the elements when user interacts with the input
selectElement.addEventListener("change", function () {
  const selectedValue = selectElement.value;
  updateStateInformation(selectedValue);
  updateTurbines();
  updateMonthlyPayment();
  updateFields();
});

textElements.slider.addEventListener("input", function () {
  const value = textElements.slider.textContent;
  sliderInputPercent.value = value;
  updateTurbines();
  updateMonthlyPayment();
  updateFields();
});

sliderInputPercent.addEventListener("input", function () {
  const value = sliderInputPercent.value;
  textElements.slider.textContent = value;
  updateTurbines();
  updateMonthlyPayment();
  updateFields();
});

textElements.cost.addEventListener("input", function () {
  updateTurbines();
  updateFields();
});

textElements.cost.addEventListener("change", function () {
  updateTurbines();
  updateFields();
});

//STATE SELECT CMS IN CALCULATOR AND MODAL
document.addEventListener("DOMContentLoaded", () => {
  // Select the select box for calculating
  const selectboxCalc = document.querySelector("#state");
  // Select the select box for ordering
  const selectboxOrd = document.querySelector("#state-order");

  // Select CMS Items for both calculation and ordering
  const states = document.querySelectorAll(".state-name");

  // Create options and add them to the select boxes
  states.forEach((el) => {
    // Create a new option element
    let option = document.createElement("option");

    // Set the option text and value to the state name
    option.text = el.innerText;
    option.value = el.innerText;

    // Add the option to both select boxes
    selectboxCalc.add(option);
    selectboxOrd.add(option.cloneNode(true));
  });
});

//MIRROR INPUT FOR RANGE SLIDER & STATE
// Get references to the select fields and input fields
const stateSelect = document.getElementById("state");
const stateOrderSelect = document.getElementById("state-order");
const interactiveSliderInput = document.getElementById(
  "interactive-slider-input"
);
const elConsumptionOrderInput = document.getElementById("El-consumption-order");

// Add an event listener to the state select field
stateSelect.addEventListener("change", () => {
  // Get the currently selected option
  const selectedOption = stateSelect.options[stateSelect.selectedIndex];

  // Loop through the options in the state order select field
  for (let i = 0; i < stateOrderSelect.options.length; i++) {
    const option = stateOrderSelect.options[i];

    // If the value of the current option matches the value of the selected option
    if (option.value === selectedOption.value) {
      // Set the state order select field to the current option
      stateOrderSelect.selectedIndex = i;
      break;
    }
  }
});

// Add an event listener to the interactive slider input field
interactiveSliderInput.addEventListener("input", () => {
  // Set the value of the el consumption order input field to the value of the interactive slider input field
  elConsumptionOrderInput.value = interactiveSliderInput.value;
});

//MIRROR INPUT FOR RADIOBUTTONS & ACTIVE STATES FOR RADIOBUTTONS
// Get references to the purchase and leasing blocks
const purchaseBlock = document.getElementById("Purchase");
const purchaseOrderBlock = document.getElementById("Purchase-order");
const leasingBlock = document.getElementById("Leasing");
const leasingOrderBlock = document.getElementById("Leasing-order");

// Add a click event listener to the purchase block
purchaseBlock.addEventListener("click", () => {
  // Simulate a click on the purchase order block
  purchaseOrderBlock.click();
});

// Add a click event listener to the leasing block
leasingBlock.addEventListener("click", () => {
  // Simulate a click on the leasing order block
  leasingOrderBlock.click();
});

// get references to the #Leasing and #Purchase elements
const leasingBlockClick = document.querySelector("#Leasing");
const purchaseBlockClick = document.querySelector("#Purchase");

// add event listeners for when the blocks are clicked
leasingBlockClick.addEventListener("click", () => {
  // add the .active class to the leasing block and remove it from the purchase block
  leasingBlockClick.classList.add("active");
  purchaseBlockClick.classList.remove("active");

  // Show leasing divs and hide purchase divs
  purchaseDivs.forEach((div) => (div.style.display = "none"));
  leasingDivs.forEach((div) => (div.style.display = "block"));
});

purchaseBlockClick.addEventListener("click", () => {
  // add the .active class to the purchase block and remove it from the leasing block
  purchaseBlockClick.classList.add("active");
  leasingBlockClick.classList.remove("active");

  // Show purchase divs and hide leasing divs
  leasingDivs.forEach((div) => (div.style.display = "none"));
  purchaseDivs.forEach((div) => (div.style.display = "block"));
});

const purchaseRadio = document.querySelector("#Purchase");
const leasingRadio = document.querySelector("#Leasing");
const purchaseDivs = document.querySelectorAll(
  ".purchase-p, .purchaces-results-wrap"
);
const leasingDivs = document.querySelectorAll(
  ".leasing-p, .leasing-results-wrap"
);

// Hide purchase and leasing divs by default
purchaseDivs.forEach((div) => (div.style.display = "none"));
leasingDivs.forEach((div) => (div.style.display = "none"));

// Add event listeners to radio buttons
purchaseRadio.addEventListener("click", () => {
  // Show purchase divs and hide leasing divs
  purchaseDivs.forEach((div) => (div.style.display = "block"));
  leasingDivs.forEach((div) => (div.style.display = "none"));
});

leasingRadio.addEventListener("click", () => {
  // Show leasing divs and hide purchase divs
  leasingDivs.forEach((div) => (div.style.display = "block"));
  purchaseDivs.forEach((div) => (div.style.display = "none"));
});

//ERROR MESSAGE IF NO STATE OR PURCHASE TYPE IS SELECTED
$(document).ready(function () {
  $("#second-step").prop("disabled", true);
  $("#state-additional").hide();
  $("#third-step").prop("disabled", true);

  $("#state").on("change", function () {
    if ($(this).val() !== "") {
      $("#second-step")
        .prop("disabled", false)
        .addClass("active")
        .attr("fs-mirrorclick-element", "trigger-1");
      $(this)
        .siblings(".error-message")
        .stop()
        .animate(
          {
            opacity: 0,
          },
          200,
          "linear",
          function () {
            $(this).addClass("hide-error").removeClass("show");
          }
        );
      $("#state-additional").show();
    } else {
      $("#second-step")
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
              opacity: 1,
            },
            200,
            "linear",
            function () {
              $(this).removeClass("hide-error").addClass("show");
            }
          );
      }
      $("#state-additional").hide();
    }
  });

  $('[name="fin_option"]').on("change", function () {
    if ($('[name="fin_option"]:checked').length > 0) {
      $("#third-step")
        .prop("disabled", false)
        .addClass("active")
        .attr("fs-mirrorclick-element", "trigger-3");
      $(this)
        .siblings(".error-message")
        .stop()
        .animate(
          {
            opacity: 0,
          },
          200,
          "linear",
          function () {
            $(this).addClass("hide-error").removeClass("show");
          }
        );
    } else {
      $("#third-step")
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
              opacity: 1,
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

  $("#second-step, #third-step").on("click", function (e) {
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
            opacity: 1,
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
                      opacity: 0,
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

//CTA GO BACK
const backButtonToFin = document.querySelector("#back-to-fin");
const backButtonToEl = document.querySelector("#back-to-el");
const backButtonToState = document.querySelector("#back-to-state");

const finOption = document.querySelector("#fin-option");
const elCons = document.querySelector("#el-cons");
const stateId = document.querySelector("#state-id");

backButtonToFin.addEventListener("click", () => {
  finOption.click();
});

backButtonToEl.addEventListener("click", () => {
  elCons.click();
});

backButtonToState.addEventListener("click", () => {
  stateId.click();
});
