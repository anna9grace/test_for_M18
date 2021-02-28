'use strict';

const form = document.querySelector( ".subscribe form" );
const formFields = form.querySelectorAll( "input" );
const submitBtn = form.querySelector( "button" );
const successMessage = document.querySelector( ".subscribe-success" );

if ( form &&  submitBtn && formFields.length > 0 && successMessage )
{
	const resetFields = () =>
	{
		for ( const field of formFields ) {
			if ( !field.value )
			{
				field.classList.add( "reset" );
			}

			field.addEventListener( "focus", () =>
			{
				field.classList.remove( "reset" );
			} )
			submitBtn.addEventListener( "click", activateFields )
		}
	}

	const activateFields = () =>
	{
		for ( const field of formFields ) {
			field.classList.remove( "reset" );
		}
	}

	form.addEventListener( "submit", ( evt ) =>
	{
		evt.preventDefault();

		successMessage.classList.remove( "hidden" );

		setTimeout( () =>
		{
			successMessage.classList.add( "hidden" );

		}, 2000 );

		form.reset();

		resetFields();
	} )

	resetFields();
}
'use strict';

const anchors = document.querySelectorAll( "a[href*='#']" )

if ( anchors.length > 0 )
{
	for ( const anchor of anchors )
	{
		anchor.addEventListener( "click", ( evt ) =>
		{
			evt.preventDefault();

			const destinationId = anchor.getAttribute( "href" ).substr( 1 );

			document.getElementById( destinationId ).scrollIntoView( {
				behavior: "smooth",
				block: "start",
			} )
		} )
	}
}
'use strict';

const sliderContainer = document.querySelector( ".styles" );
const slides = sliderContainer.querySelectorAll( "li" );
const prevSlideBtn = sliderContainer.querySelector( ".previous-slide" );
const nextSlideBtn = sliderContainer.querySelector( ".next-slide" );

if ( sliderContainer && prevSlideBtn && nextSlideBtn && slides.length > 0 )
{
	let activeSlideIndex = Math.floor( slides.length / 2 );

	const disableButton = ( limitIndex, button ) => {
		activeSlideIndex === +limitIndex
			? button.setAttribute( "disabled", "disabled" )
			: button.removeAttribute( "disabled", "disabled" )
	}

	const disableButtons = () =>
	{
		disableButton( '0', prevSlideBtn );
		disableButton( (slides.length - 1), nextSlideBtn );
	}

	const moveSlides = () =>
	{
		const prevActiveSlide = sliderContainer.querySelector( "li.active" );

		for ( const slide of slides )
		{
			slide.style.left = activeSlideIndex * (-100) + "%";
		}

		if ( prevActiveSlide )
		{
			prevActiveSlide.classList.remove( "active" );
		}

		slides[activeSlideIndex].classList.add( "active" );
	}

	prevSlideBtn.addEventListener( "click", ( evt ) =>
	{
		evt.preventDefault();

		activeSlideIndex --;
		moveSlides();

		disableButtons();
	} )

	nextSlideBtn.addEventListener( "click", ( evt ) =>
	{
		evt.preventDefault();

		activeSlideIndex ++;
		moveSlides();

		disableButtons();
	} )

	moveSlides();
}