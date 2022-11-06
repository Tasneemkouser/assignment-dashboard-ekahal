export const isValidEmail = (email) => {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
};

export const validateLoginForm = (form) => {
  const formErrors = {};
  const payload = {};
  [...form.querySelectorAll("input")].forEach((input) => {
    const { name, value } = input;
    if (value) {
      payload[name] = value;
    } else {
      formErrors[name] = `${name} is required`;
    }

    if (name === "email" && !isValidEmail(value)) {
      formErrors[name] = `Invalid Email`;
    }
  });

  return { payload, formErrors };
};

export const extractNameFromEmail = (email) => (email || "").split("@")[0];

export const getYearsRange = (startYear = 1991, endYear = 2015, range = 10) => {
  let years = [];
  for (let i = startYear; i < endYear; i = i + range) {
    let rangeYear = i + (range - 1);
    if (rangeYear >= endYear) {
      rangeYear = endYear;
    }
    years.push([i, rangeYear]);
  }

  return years;
};
