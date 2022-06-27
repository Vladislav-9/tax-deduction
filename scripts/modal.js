const btnModalOpen = document.querySelector('.intro__button');
const overlayModal = document.querySelector('.overlay');
const intro = document.querySelector('.intro');
const counting = document.querySelector('.modal__data-button');
const pay = document.querySelector(".modal__data-input");
const totalList = document.querySelector('.modal__total-list');
const totalDiv = document.querySelector('.modal__total');
const options = document.querySelectorAll('input[type=radio]');

btnModalOpen.addEventListener('click', () => {
	overlayModal.classList.add('overlay_active');
	intro.classList.add('hide');
});

overlayModal.addEventListener('click', event => {
	const target = event.target;
	if (target === overlayModal || target.closest('.modal__close')) {
		overlayModal.classList.remove('overlay_active');
		intro.classList.remove('hide');
		totalDiv.classList.add('hide');
		pay.value = '';
	}
});

counting.addEventListener('click', event => {
	totalList.textContent = '';
	if (pay.validity.valid) {
		if (options[0].checked) {
			showList('checkbox');
		} else {
			showList('radio');
		}
		totalDiv.classList.remove('hide');
		event.preventDefault();
	}
});

function showList(typeOption) {
	const value = pay.value;
	const sums = countTax(value);
	if (typeOption === 'checkbox') {
		sums.forEach((number, index) => {
			const itemList = createItem(number, index, typeOption);
			totalList.append(itemList);
		});
	} else {
		const number = sums[0];
		const year = sums.length - 1;
		const countMonths = (sums[sums.length - 1] * 12) / number;
		const month = Math.ceil(countMonths);
		const period = [year, month];
		const itemList = createItem(number, 0, typeOption, period);
		totalList.append(itemList);
	}
}

function countTax(value) {
	let arrSums = [];
	const sum = (value * 12) * 0.13;
	const totalSum = 260000;
	const countYears = Math.trunc(totalSum / sum);
	for (let i = 0; i < countYears; i++) {
		arrSums.push(sum);
	}
	const lastYear = totalSum % sum;
	arrSums.push(lastYear);
	return arrSums;
}

function createItem(number, index, typeOption, period) {
	const li = document.createElement('li');
	li.className = 'modal__total-item item';
	const input = document.createElement('input');
	input.className = 'item__output';
	input.type = typeOption;
	input.id = `${index + 1}item`;
	input.name = 'total';
	input.value = `${index + 1}value`;
	if (index === 0) input.checked = true;
	li.append(input);
	createLabel(number, index, typeOption, period, li);
	return li;
}

function createLabel(number, index, typeOption, period, li) {
	const label = document.createElement('label');
	label.className = 'item__text';
	label.setAttribute('for', `${index + 1}item`);
	const span = document.createElement('span');
	span.className = 'item__text-year';
	if (typeOption === 'checkbox') {
		label.textContent = `${number} рублей `;
		span.textContent = `в ${index + 1}-й год`;
	} else {
		label.textContent = `${number} \u{20BD} `;
		const [year, month] = period;
		let wordYear = 'года';
		if (year < 2) wordYear = 'год'
		if (year > 4 || year === 0) wordYear = 'лет'
		span.textContent = `${year} ${wordYear} ${month} мес.`;
		if (number === 260000) {
			span.textContent = `${year + 1} год 0 мес.`;
		}
	}
	label.append(span);
	li.append(label);
	return li;
}