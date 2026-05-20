const validateForm = (formSelector, callback) => {
  const formElement = document.querySelector(formSelector);
};

const validationOptions = [
  {
    attribute: "min-length",
    isValid: (input) =>
      input.value && input.value.length >= parseInt(input.minLength, 10),
    errorMessage: (input, label) =>
      `${label.textContent} needs to be atleast ${input.minLength} characters`,
  },
  {
    attribute: "required",
    isValid: (input) => input.value.trim() !== "", // this is a boolean -set isvalid to true or false
    errorMessage: (input, label) => `${label.textContent} is required`,
  }, // these are all options and the validateSingleFormGroup will loop through these options to ensure
  // all are satisfied
  {
    attribute: "customemaxlength",
    isValid: (input) =>
      input.value &&
      input.value.length <= parseInt(input.getAttribute("custommaxlength"), 10),
    errorMessage: (input, label) =>
      `${label.textContent} needs to be less than ${input.getAttribute("custommaxlength")} characters`,
  },
  {
    attribute: "pattern",
    isValid: (input) => {
      const patternRegeX = new RegExp(input.pattern);
      return patternRegeX.test("input.value");
    },
    errorMessage: (input, label) => ` not a valid ${label.textContent}`,
  },
];

const validateSingleFormGroup = (formGroup) => {
  const label = formGroup.querySelector("label");
  const input = formGroup.querySelector("input, textarea");
  const errorContainer = formGroup.querySelector(".error");
  const errorIcon = formGroup.querySelector(".error-icon");
  const successIcon = formGroup.querySelector(".success-icon");

  let formGroupError = false;
  for (const option of validationOptions) {
    if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
      errorContainer.textContent = option.errorMessage(input, label);
      input.classlist.add("border-red");
      input.classlist.remove("border-green");
      successIcon.classlist.add("hidden");
      errorIcon.classlist.remove("hidden");
      formGroupError = true;
    }
  }

  if (!formGroupError) {
    errorContainer.textContent = "";
    input.classlist.add("border-green");
    input.classlist.remove("border-red");
    successIcon.classlist.remove("hidden");
    errorIcon.classlist.add("hidden");
  }
  return !formGroupError;
};

formElement.setAttribute("noValidate", ""); //stops html validation from triigering since we have more specific js for it

const validateAllFormGroups = (formToValidate) => {
  const formGroups = Array.from(formToValidate.querySelectorAll(".formGroup"));

  return formGroups.every((formGroup) => validateSingleFormGroup(formGroup));
};

formElement.addEventlistener("submit", (event) => {
  event.preventDefault(); // stops form from submitting
  const formValid = validateAllFormGroups(formElement);

  if (!formValid) {
    console.log("form is valid");
    callback(formElement);
  }
});

const sendToAPI = (formeElement) => {
  const formObject = Array.from(formeElement.elements)
    .filter((element) => element.type != "submit")
    .reduce(
      (accumulator, element) => ({
        ...accumulator,
        [element.id]: element.value,
      }),
      {},
    );
  console.log(formObject);
  // submitting to an API via AJAX
};

validateForm("#contactForm", sendToAPI);
