const btnModalOpen = document.querySelector('.intro__button');
const overlayModal = document.querySelector('.overlay');
const intro = document.querySelector('.intro');
const counting = document.querySelector('.modal__data-button');
const pay = document.querySelector(".modal__data-input");
const totalList = document.querySelector('.modal__total-list');
const totalDiv = document.querySelector('.modal__total');

btnModalOpen.addEventListener('click', () => {
	overlayModal.classList.add('overlay_active');
	intro.classList.add('hide');
});

overlayModal.addEventListener('click', event => {
	const target = event.target;
	if (target === overlayModal || target.closest('.modal__close')) {
		overlayModal.classList.remove('overlay_active');
		intro.classList.remove('hide');
		totalList.textContent = '';
		pay.value = '';
	}
});

counting.addEventListener('click', event => {
	totalList.textContent = '';
	if (pay.validity.valid) {
		showList();
		totalDiv.classList.remove('hide');
		event.preventDefault();
	}
});

function showList() {
	const value = pay.value;
	const sums = countTax(value);
	sums.forEach((number, index) => {
		const itemList = createItem(number, index);
		totalList.append(itemList);
	});
}

function countTax(value) {
	let arrSums = [];
	const sum = (value * 12) * 0.13;
	const totalSum = 260000;
	const countMonths = Math.trunc(totalSum / sum);
	for (let i = 0; i < countMonths; i++) {
		arrSums.push(sum);
	}
	const lastMonth = totalSum % sum;
	arrSums.push(lastMonth);
	return arrSums;
}

function createItem(number, index) {
	const li = document.createElement('li');
	li.className = 'modal__total-item item';
	const input = document.createElement('input');
	input.className = 'item__output';
	input.type = 'checkbox';
	input.id = `${index + 1}year`;
	input.name = 'total';
	input.value = `${index + 1}year`;
	if (index === 0) input.checked = true;
	li.append(input);
	const label = document.createElement('label');
	label.className = 'item__text';
	label.setAttribute('for', `${index + 1}year`);
	label.textContent = `${number} рублей `;
	const span = document.createElement('span');
	span.className = 'item__text-year';
	span.textContent = `в ${index + 1}-й год`;
	label.append(span);
	li.append(label);
	return li;
}