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
