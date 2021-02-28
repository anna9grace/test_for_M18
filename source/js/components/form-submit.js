'use strict';

const form = document.querySelector('.subscribe form');
const formFields = form.querySelectorAll('input');
const submitBtn = form.querySelector('button');
const successMessage = document.querySelector('.subscribe-success');

if ( form &&  submitBtn && formFields.length > 0 && successMessage )
{
    const resetFields = () =>
    {
        for ( const field of formFields ) {
            if ( !field.value )
            {
                field.classList.add('reset');
            }

            field.addEventListener( 'focus', () =>
            {
                field.classList.remove('reset');
            } )
            submitBtn.addEventListener( 'click', activateFields )
        }
    }

    const activateFields = () =>
    {
        for ( const field of formFields ) {
            field.classList.remove('reset');
        }
    }

    form.addEventListener( 'submit', (evt) =>
    {
        evt.preventDefault();
        successMessage.classList.remove('hidden');
        setTimeout( () =>
        {
            successMessage.classList.add('hidden');

        }, 2000 );
        form.reset();
        resetFields();
    } )

    resetFields();
}
