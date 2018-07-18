/* ==========================================================================
Dashboard core JS file 
========================================================================== */

$(document).ready(function ($) {
    "use strict";

    //Reader mode (only for mobile)
    $('#reader-mode-toggle').on("click", function () {
        $('body').toggleClass('reader-mode');
    });

    //Main menu icon behaviour and push sidebar
    $('.side-icon').on("click", function () {
        $('.side-icon.is-active').removeClass('is-active');
        $(this).addClass('is-active');
        $('.child-menu').addClass('is-sidebar-translated');
        $('.dashboard-nav').addClass('is-pushed');
         //disable reader mode switch when sidebar is opened
         $('.reader-switch label').addClass('is-disabled');
         //child menu icon rotate active
         $('.menu-wrapper .icon-box-toggle').addClass('active');
    });

    //child menu close icon click
    $('.menu-wrapper').on("click", function () {
        $('.child-menu').toggleClass('is-sidebar-translated');
        $('.dashboard-nav, #dashboard-wrapper').toggleClass('is-pushed');
         //enable reader mode switch when sidebar is closed
         $('.reader-switch label').removeClass('is-disabled');
         $('.side-icon.is-active').removeClass('is-active');
    });


})