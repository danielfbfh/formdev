class FormSubmit {
  constructor(adjustment) {
    this.adjustment = adjustment;
    this.form = document.querySelector(adjustment.form);
    this.buttonSubmit = document.querySelector(adjustment.button);

    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }
  displaySuccess() {
    this.form.innerHTML = this.adjustment.success;
  }
  displayError() {
    this.form.innerHTML = this.adjustment.error;
  }
  getForm() {
    const form = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      form[field.getAttribute("name")] = field.value;
    });
  }
  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
  }
  async sendForm(event) {
    try {
      this.onSubmission(event);

      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(this.getForm()),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError;
    }
  }

  init() {
    if (this.form) {
      this.buttonSubmit.addEventListener("click", this.sendForm);
    }
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada com sucesso!</h1>",
  error: "<h1 class='error'>Não foi possivel enviar sua mensagem!</h1>",
});
formSubmit.init();
