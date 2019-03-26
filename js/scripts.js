// объект настроек приложения

var app = Object();
	
	app.name = 'Звезда';
	app.description = 'интернет-магазин наручных часов';
	app.phone = '+7-900-000-00-00';
	app.worktime = 'пн-вс 9:00-23:00';
	
	app.getYear = function() {	// method: get current year
			var date = new Date();
			var year = date.getFullYear();
		return year;
	}
	
	// method: find elements by class name and set innerHTML
	app.setTextByClassName = function(classByName, data) {
		var classes = document.querySelectorAll(classByName);
		classes.forEach(function(thisClass, i){
			thisClass.innerHTML = data;
		});
	}

	
	app.start = function() {	// method: start app
		this.setTextByClassName('.app-name', this.name);
		this.setTextByClassName('.slogan-text', this.description);
		document.querySelector('#top-phone span').innerHTML = this.phone;
		document.querySelector('#top-worktime span').innerHTML = this.worktime;
		this.mainMenuInit();
		document.getElementById('this-year').innerHTML = this.getYear();
	}
	
	app.mainMenuInit = function() {	// init main menu
		var mainMenuItem = document.querySelectorAll('#main-menu ul li a');
			mainMenuItem.forEach(function(menuItem, i){
				menuItem.addEventListener('click', function(event) {
					event.preventDefault();
					var self = this;
					document.querySelector('h1').innerHTML = this.getAttribute('title');
					
					mainMenuItem.forEach(function(menuItem, i){
						menuItem.classList.remove('menu-selected');
					});
					
					menuItem.classList.add('menu-selected');
					
					var itemContainer = document.querySelectorAll('.item-container');
						itemContainer.forEach(function(item, i){
							var catId = self.dataset.catId;
							var itemCatId = item.dataset.catId;
							if(catId && itemCatId == catId ) {
								item.style.display = 'block';
							} 
							else if (catId && catId == 0) {
								item.style.display = 'block';
								
							} 
							else {
								item.style.display = 'none';
							}
							app.cart(catId);
						});
					
					/*console.log('html=' + this.innerHTML);
					console.log('menuItem=' + menuItem.innerHTML);
					console.log('data-cat-id=' + this.dataset.catId);
					console.log('i=' + i);*/
					
				});
			});
			
		app.cart = function(id) {	// method: cart init
			
			var cart = document.getElementById('cart');
				cart.style.display = 'none';
			
			var cartCatId = cart.dataset.catId;
			
			if(cartCatId && cartCatId == id ) {
				cart.style.display = 'block';	
			}
		}
	}

window.onload = function() {
	
	app.start();
	
	app.cart(99);
	
	document.querySelector('#main-menu ul li a').click();
}

	

