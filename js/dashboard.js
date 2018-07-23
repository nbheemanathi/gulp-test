/* ==========================================================================
Dashboard core JS file 
========================================================================== */

$(document).ready(function($) {
  "use strict";

  //#region Render mode toggle(only for mobile)
  $("#reader-mode-toggle").on("click", function() {
    $("body").toggleClass("reader-mode");
  });
  //#endregion

  //#region Main menu icon behaviour and push sidebar
  $(".side-icon").on("click", function() {
    $(".side-icon.is-active").removeClass("is-active");
    $(this).addClass("is-active");
    $(".child-menu").addClass("is-sidebar-translated");
    $(".dashboard-nav").addClass("is-pushed");
    //disable reader mode switch when sidebar is opened
    $(".reader-switch label").addClass("is-disabled");
    //child menu icon rotate active
    $(".menu-wrapper .icon-box-toggle").addClass("active");
  });
  //#endregion

  //#region child menu close icon click
  $(".menu-wrapper").on("click", function() {
    $(".child-menu").toggleClass("is-sidebar-translated");
    $(".dashboard-nav, #dashboard-wrapper").toggleClass("is-pushed");
    //enable reader mode switch when sidebar is closed
    $(".reader-switch label").removeClass("is-disabled");
    $(".side-icon.is-active").removeClass("is-active");
  });
  //#endregion

  //#region quickView toggle event (temp)
  $(".chat-button").on("click", function() {
    $(".quickview").toggleClass("is-active");
  });
  $(".cross-container").on("click", function() {
    $(".quickview").toggleClass("is-active");
  });
  //#endregion

  //#region Side Child menu click
  $(".sidebar-menu > li.have-children a.parent-link").on("click", function(i) {
    i.preventDefault();
    if (!$(this).parent().hasClass("active")) {
        $(".sidebar-menu li ul").slideUp();
        $(this).next().slideToggle();
        $(".sidebar-menu li").removeClass("active");
        $(this).parent().addClass("active");
    } 
    else {
      $(this).next().slideToggle();
      $(".sidebar-menu li").removeClass("active");
    }
  });
  //#endregion

  //#region Data child menu setup
  $('.main-menu ul li.side-icon').on("click", function(){
      var menu_id = $(this).attr('data-child-menu');
      $('.sidebar-menu.is-active').removeClass('is-active');
      $("#" + menu_id).addClass('is-active');
    })
     //#endregion

});
