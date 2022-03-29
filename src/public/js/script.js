
  
  $(".search-bar input")
   .focus(function () {
    $(".header").addClass("wide");
   })
   .blur(function () {
    $(".header").removeClass("wide");
   });
  
  
  
  function changeSidebarView(){
    var sidebar = document.getElementsByClassName("sidebar-container")[0];
    const viewButton = document.getElementsByClassName("sidebar-viewButton")[0];
    if (viewButton.title == "Shrink"){
      sidebar.className += " shrink";
      viewButton.ariaLabel = "Expand Sidebar";
      viewButton.title = "Expand";
    } else{
      sidebar.className = "sidebar-container ";
      viewButton.ariaLabel = "Shrink Sidebar";
      viewButton.title = "Shrink";
    }
  }
  
  var swiper = new Swiper('.product-slider', {
    spaceBetween: 30,
    effect: 'fade',
    // initialSlide: 2,
    loop: false,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev'
    },
    // mousewheel: {
    //     // invert: false
    // },
    on: {
        init: function(){
            var index = this.activeIndex;
  
            var target = $('.product-slider__item').eq(index).data('target');  
            $('.product-img__item').removeClass('active');
            $('.product-img__item#'+ target).addClass('active');
        }
    }
  
  });
  
  swiper.on('slideChange', function () {
    var index = this.activeIndex;
  
    var target = $('.product-slider__item').eq(index).data('target');
  
    console.log(target);
  
    $('.product-img__item').removeClass('active');
    $('.product-img__item#'+ target).addClass('active');
  
    if(swiper.isEnd) {
        $('.prev').removeClass('disabled');
        $('.next').addClass('disabled');
    } else {
        $('.next').removeClass('disabled');
    }
  
    if(swiper.isBeginning) {
        $('.prev').addClass('disabled');
    } else {
        $('.prev').removeClass('disabled');
    }
  });
  
  $(".js-fav").on("click", function() {
    $(this).find('.heart').toggleClass("is-active");
  });
  
  
  const sizes = document.querySelectorAll('.size');
  const colors = document.querySelectorAll('.color');
  const shoes = document.querySelectorAll('.shoe');
  const shoeBg = document.querySelector('.shoeBackground');
  var choicecolor;
  var choiceSize;
  let animationEnd = true;

function changeColor(){
    colors.forEach(cl => cl.classList.remove('active'));
    this.classList.add('active');
    choicecolor = this.getAttribute('color');

}
function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
    choiceSize = this.innerHTML; 
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

function changeHeight(){
    var x = window.matchMedia("(max-width: 1000px)");
    if(x.matches){
    }
    else{
        
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);

$('.buy-add-button-click').on('click',(e)=>{
  if(!choicecolor) choicecolor = 'red';
  if(!choiceSize) choiceSize = '40';
  $.ajax({
    type: "GET",
    url: '/cart/'+e.target.id,
    data: { 
        'name':$('.name-product').html(),
        'image':$('.img-product-now').attr('src'),
        'color':choicecolor,
        'size':choiceSize,
        'price':$('.price-product').html()
    },
    success: (data)=>{
      if(data === 'success'){
        alert('Thêm vào giỏ hàng thành công');
      }
    },
  });
})


function changequantity1(e,size,color,price){
  $.ajax({
    type: "GET",
    url: '/cart/update/giam',
    data:{
      'id':e,
      'color':color,
      'size':size
    },
    success: (data)=>{
      if(data.length === 0) { location.reload(); return;}
      if(data.length && data.sum){
        
        $('.'+e+size+color).html((parseFloat(data.length)*parseFloat(price)).toFixed(3));
        $('#'+e+size+color).html(data.length);
        var sum = parseFloat(data.sum).toFixed(3);
        var sumx = (sum*0.1).toFixed(3);
        var sumd = (sum*0.05).toFixed(3);
        var sumtotal = parseFloat(sum+sumx+sumd);
        sumtotal = sumtotal.toFixed(3);
        $('.cost-value-default').html('$'+sum);
        $('.cost-value-tax').html('$'+sumx);
        $('.cost-value-deliver').html('$'+sumd);
        $('.cost-value-total').html('$'+sumtotal);
      }
    },
  });
}
function changequantity2(e,size,color,price) {
  $.ajax({
    type: "GET",
    url: '/cart/update/tang',
    data:{
      'id':e,
      'color':color,
      'size':size
    },
    success: (data)=>{
      if(data.length && data.sum){
        $('.'+e+size+color).html((parseFloat(data.length)*parseFloat(price)).toFixed(3));
        $('#'+e+size+color).html(data.length);
        var sum = parseFloat(data.sum).toFixed(3);
        var sumx = (sum*0.1).toFixed(3);
        var sumd = (sum*0.05).toFixed(3);
        var sumtotal = parseFloat(sum+sumx+sumd);
        sumtotal = sumtotal.toFixed(3);
        $('.cost-value-default').html('$'+sum);
        $('.cost-value-tax').html('$'+sumx);
        $('.cost-value-deliver').html('$'+sumd);
        $('.cost-value-total').html('$'+sumtotal);
      }
    },
  });
}

document.querySelector('.img__btn').addEventListener('click', function() {
  document.querySelector('.cont').classList.toggle('s--signup');
});

