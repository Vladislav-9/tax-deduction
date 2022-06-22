const form = document.querySelector(".modal__form");
const salary = document.querySelector(".modal__data-input");
const formError = document.querySelector(".modal__data-err_msg");

salary.addEventListener('input', function (event) {
	if (salary.validity.valid) {
		formError.textContent = "";
		formError.className = "modal__data-err_msg";
		salary.className = "modal__data-input";
	} else {
		showError();
	}
});

form.addEventListener('submit', function (event) {
	if (!salary.validity.valid) {
		showError();
		event.preventDefault();
	}
});

function showError() {
	if (salary.validity.valueMissing) {
		formError.textContent = "Поле обязательно для заполнения";
	} else if (salary.validity.patternMismatch) {
		formError.textContent = 'Введите в формате "10000"';
	}
	formError.className = "modal__data-err_msg active";
	salary.className = "modal__data-input error";
}