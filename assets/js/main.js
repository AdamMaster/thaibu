class MobileDrawer {
	constructor(buttonSelector, mobildeDrawerSelector, mobileMenuItemSelector, mobileOverlaySelector) {
		this.buttonSelector = buttonSelector
		this.mobildeDrawerSelector = mobildeDrawerSelector
		this.mobileMenuItemSelector = mobileMenuItemSelector
		this.mobileOverlaySelector = mobileOverlaySelector

		this.init()
	}

	init() {
		const buttonEl = document.querySelector(this.buttonSelector)
		const mobileDrawerEl = document.querySelector(this.mobildeDrawerSelector)
		const mobileMenuItemEls = mobileDrawerEl.querySelectorAll(this.mobileMenuItemSelector)
		const mobileOverlayEl = document.querySelector(this.mobileOverlaySelector)

		buttonEl.addEventListener('click', () => {
			this.toggle(buttonEl, mobileDrawerEl, mobileOverlayEl)
		})

		mobileMenuItemEls.forEach(item => {
			item.addEventListener('click', () => {
				this.toggle(buttonEl, mobileDrawerEl, mobileOverlayEl)
			})
		})

		mobileOverlayEl.addEventListener('click', () => {
			this.toggle(buttonEl, mobileDrawerEl, mobileOverlayEl)
		})
	}

	toggle(button, drawer, overlay) {
		button.classList.toggle('active')
		drawer.classList.toggle('active')
		overlay.classList.toggle('active')
	}
}
const mobileDrawer = new MobileDrawer('.burger', '.mobile-drawer', '.mobile-menu-list li a', '.mobile-overlay')


class Language {
	constructor(languageSelector, languageCurrentSelector, languageCurrentTextSelector, languageItemSelector) {
		this.languageSelector = languageSelector
		this.languageCurrentSelector = languageCurrentSelector
		this.languageItemSelector = languageItemSelector
		this.languageCurrentTextSelector = languageCurrentTextSelector

		this.init()
	}

	init() {
		const languageEl = document.querySelector(this.languageSelector)
		const languageCurrentTextEl = languageEl.querySelector(this.languageCurrentTextSelector)

		if (!localStorage.getItem('currentLang')) {
			localStorage.setItem('currentLang', 'EN');
		}

		const savedLang = localStorage.getItem('currentLang');
		if (savedLang) {
			languageCurrentTextEl.innerText = savedLang;
		}

		languageEl.addEventListener('click', e => {
			if (e.target.closest(this.languageCurrentSelector)) {
				this.toggle(languageEl)
			}
			if (e.target.closest(this.languageItemSelector)) {
				this.setText(languageEl, e.target)
				this.close(languageEl)
			}
		})

		document.addEventListener('click', e => {
			if (!e.target.closest(this.languageSelector)) {
				this.close(languageEl)
			}
		})
	}

	toggle(element) {
		element.classList.toggle('active')
	}

	close(element) {
		element.classList.remove('active')
	}

	setText(current, item) {
		localStorage.setItem('currentLang', item.innerText);
		current.querySelector(this.languageCurrentTextSelector).innerText = localStorage.getItem('currentLang')
	}
}
const language = new Language('.language', '.language-current', '.language-current-text', '.language-item')


const swiperPartners = new Swiper(".from-partner .swiper", {
	slidesPerView: 3,
	spaceBetween: 25,
	navigation: {
		nextEl: ".from-partner .swiper-button-next",
		prevEl: ".from-partner .swiper-button-prev",
	},
	breakpoints: {
		320: {
			slidesPerView: 1.4,
			spaceBetween: 15
		},
		480: {
			slidesPerView: 2,
			spaceBetween: 15
		},
		576: {
			slidesPerView: 2.5,
			spaceBetween: 16
		},
		768: {
			slidesPerView: 3,
			spaceBetween: 16
		},
		992: {
			slidesPerView: 3.5,
			spaceBetween: 16
		},
		1200: {
			slidesPerView: 4,
			spaceBetween: 16
		},
	}
})

const setHeightToPartnerCards = () => {
	const cardEls = document.querySelectorAll('.partner-card')
	if (!cardEls.length) return

	const maxHeight = Array.from(cardEls).reduce((max, card) => {
		return Math.max(max, card.clientHeight)
	}, 0)

	cardEls.forEach(card => {
		card.style.height = `${maxHeight}px`
	})
}
document.addEventListener('DOMContentLoaded', setHeightToPartnerCards)


class Tabs {
	constructor(parentSelector, tabContentSelector, tabButtonSelector) {
		this.parentSelector = parentSelector
		this.tabContentSelector = tabContentSelector
		this.tabButtonSelector = tabButtonSelector

		this.init()
	}

	init() {
		const parentEl = document.querySelector(this.parentSelector)
		const contentEls = document.querySelectorAll(this.tabContentSelector)
		const buttonEls = Array.from(document.querySelectorAll(this.tabButtonSelector))

		parentEl.addEventListener('click', e => {
			const button = e.target.closest(this.tabButtonSelector)
			const index = buttonEls.indexOf(button)

			console.log(index);

			if (!button) return

			this.setActiveContent(contentEls, buttonEls, index)
		})
	}

	setActiveContent(contents, buttons, index) {
		contents.forEach(content => {
			content.classList.remove('active')
		})
		buttons.forEach(button => {
			button.classList.remove('active')
		})

		contents[index].classList.add('active')
		buttons[index].classList.add('active')
	}
}
if (window.innerWidth >= 1200) {
	const tabs = new Tabs('.tabs', '.tabs-content', '.tabs-item')
}

class Accordion {
	constructor(accordionSelector, itemSelector, buttonSelector, contentSelector, activeIndex = null) {
		this.accordionSelector = accordionSelector
		this.itemSelector = itemSelector
		this.buttonSelector = buttonSelector
		this.contentSelector = contentSelector
		this.activeIndex = activeIndex

		this.init()
	}

	init() {
		const accordionElements = document.querySelectorAll(this.accordionSelector)

		accordionElements.forEach(accordionElement => {
			const itemElements = accordionElement.querySelectorAll(this.itemSelector)
			const contentElements = accordionElement.querySelectorAll(this.contentSelector)

			if (this.activeIndex !== null) {
				const activeItem = itemElements[this.activeIndex];
				const activeContent = activeItem.querySelector(this.contentSelector);
				activeItem.classList.add('active');
				if (activeContent) activeContent.style.height = window.innerWidth >= 576 ? '300px' : '120px';
			}

			accordionElement.addEventListener('click', e => {
				const target = e.target.closest(this.buttonSelector)

				if (!target) return


				this.toggle(target, itemElements, contentElements)

			})
		})
	}

	toggle(target, itemElements, contentElements) {
		const currentElement = target.parentNode
		if (!currentElement) return

		const contentElement = currentElement.querySelector(this.contentSelector)
		if (!contentElement) return

		const isActive = currentElement.classList.contains('active')

		itemElements.forEach(el => el.classList.remove('active'))
		contentElements.forEach(el => el.style.height = '')



		if (!isActive) {
			currentElement.classList.add('active')
			contentElement.style.height = window.innerWidth >= 576 ? '300px' : '120px'
		} else {
			currentElement.classList.remove('active')
			contentElement.style.height = ``
		}
	}
}

if (window.innerWidth <= 1199) {
	document.addEventListener('DOMContentLoaded', () => {
		const accordion = new Accordion('.tabs', '.tabs-item', '.tabs-item-button', '.tabs-item-expand', 0)
	})
}


const createValidator = (check) => {
	return (value) => {
		if (typeof check === 'function') return check(value)
		return check.test(value)
	}
}

const emailValidator = createValidator(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)

const form = document.querySelector('.footer-subscribe')
const input = form.querySelector('.subscribe-input')
const button = form.querySelector('.subscribe-button')
const error = form.querySelector('.subscribe-error')

input.addEventListener('input', () => {
	emailValidator(input.value)
	if (emailValidator(input.value)) {
		error.classList.remove('active')
		button.disabled = false
	} else {
		error.classList.add('active')
		button.disabled = true
	}
})

form.addEventListener('submit', e => {
	e.preventDefault()

	if (emailValidator(input.value)) {
		error.classList.remove('active')
		form.reset()
	} else {
		error.classList.add('active')
	}
})