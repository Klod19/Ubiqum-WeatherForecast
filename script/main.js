/*eslint-env browser*/
/*eslint "no-console": "off" */



//{"cod":"200","calctime":0.3107,"cnt":15,"list":[{"id":2208791,"name":"Yafran","coord":{"lon":12.52859,"lat":32.06329},"main":{"temp":9.68,"temp_min":9.681,"temp_max":9.681,"pressure":961.02,"sea_level":1036.82,"grnd_level":961.02,"humidity":85},"dt":1485784982,"wind":{"speed":3.96,"deg":356.5},"rain":{"3h":0.255},"clouds":{"all":88},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}]},
                                                
                                                
 
var app = new Vue({
        el: '#vueApp',
        data: {
            allCities: [],
            citiesUrl: {
                Yafran : "https://mw2.google.com/mw-panoramio/photos/medium/5020043.jpg",
                Zuwarah: "https://www.temehu.com/pictures3/p3/Zuwarah-beach-sand-dunes2.jpg",
                Sabratha: "http://whc.unesco.org/uploads/thumbs/site_0184_0009-750-0-20151105121354.jpg",
                Gharyan: "https://maison-monde.com/wp-content/uploads/2017/01/kabaw-libye-1.jpg",
                Zawiya: "http://seekershub.org/blog/wp-content/uploads/2016/06/zawiya_CREDIT-Victor-feature.jpg",
                Tripoli: "https://www.dentons.com/-/media/images/website/background-images/offices/tripoli/tripoli.jpg",
                Tarhuna: "https://s-media-cache-ak0.pinimg.com/originals/2e/4f/fb/2e4ffb4471c52265526d0ed7e0e3c0f1.jpg",
                Masallatah: "https://allthecities.com/image_c/320x175/001/034/005/original/original.",
                Al_Khums: "https://www.a1autotransport.com/wp-content/uploads/2016/07/al-khums.png",
                Zlitan: "http://cdn4.spiegel.de/images/image-224923-860_poster_16x9-lldj-224923.jpg",
                Birkirkara: "https://cdn-attachments.timesofmalta.com/41b602d75309053dcd86462d563d425670f218a2-1433833168-55768ed0-620x348.jpg",
                Ragusa:"http://www.italymagazine.com/sites/default/files/styles/960x430/public/ragusa-4-crop.jpg?itok=J8QKLSE0",
                Pozzallo: "https://s.iha.com/00114992616/Pozzallo-Pozzallo.jpeg",
                Modica: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW2nUT19globOoMoqnoPQUguwvvk5QreBpEq-xzMdq1ucsutRn",
                Rosolini:"http://www.hypertours.de/tours/rosolini/images/1503009.jpg"
                },
            urlArray: [],
            mirrorArrray: [],
        },
        
        created: function(){ //I initialize the page calling "getData", which makes the starting table 
            this.getCities();
        },
        
        methods: {
            getCities: function(){
                $.getJSON("https://api.myjson.com/bins/i8run", function(data){
                console.log("now i have the data");
                app.allCities = data.list
                app.testLoop();
                app.addUrl();
                app.makeCrossfade();

                })
                
            },
            
            testLoop: function(){
                var cityNames =[];
                this.allCities.forEach(function(city){
                    cityNames.push(city.name)
                })
                console.log(cityNames);
                console.log("here the whole cities:");
                console.log(app.allCities)
            },
            
            addUrl: function(){
               //this makes an array out of the object citiesUrl;

                $.each(app.citiesUrl, function(key, value) { //for each element of object citiesUrl...
                    app.urlArray.push(value);//... I push the value in the a new array
                });
//                console.log(app.urlArray)
//                // now I have to put the url in the array allCities

               for(var i=0; i < app.urlArray.length; i++){
                   app.allCities[i].url = app.urlArray[i];
               }//!! I can't just push an element from an array, it messes with vue, which doesn't recognise it, because it's put there without any key, so vue can't check it and crashes; what i do is above: the object at index "i" of allCities gets an a new property called "url", whose content is the elemnt at index "i" of urlArray
               console.log(app.allCities)
           },
            
            scrollDown: function() {
            $('#browseButton').click(function(){ // gets the id in html file 
            $('html,body').animate({ // it will animate all html body 
            scrollTop: $('#tableContainer').offset().top}, 'slow'); // get the other id where you want the page to scroll to. then offset the page and slow the animation.the only options available to offset are top and left for some reason.     
                });
            },
            
            makeCrossfade: function() {
                $(document).ready(function(){//. ready makes function available when document is loaded
                    setInterval(function(){
                        //get current active image (image with .active class):
                        var active = $("#footer .active");
                        // if there is another div after it, make this image NEXT;
                        //if not, go back to the first div of the footer;
                        var next;
                        if(active.next().length > 0){//i.e. if there's a div after, if there's an element
                            next=active.next() // the next div is the div with the active class; 
                        }
                        else{
                            next = $("#footer div:first")// the first div in the footer will be the "next" div
                        }
                        
                        //THEN: get the next img ready by modifying its z-index:
                        next.css("z-index", "2");
                        
                        //fade out the active div 
                        active.fadeOut(3000, function(){ //1000ms speed paramether
                            
                        //move active div to back of the pile, show it and:
                            //a) remove the active class
                            active.css("z-index", "1").show().removeClass("active");
                            //b) make the next div the active one; give it a z-index of 3
                            next.css("z-index", "3").addClass("active")
                            
                        })
                        
                    }, 6000) //3000ms, paramether of setInterval; function is executed every 3 s
                }) 
            }
            
        
     },
        /*computed:{} i use this when i want something to load on changes; when something happens on the page, the code here doesn't need to be called (like for "methods"), it'll start; for example, useful for filters where we write something
        */
        computed: {
            //WHY DOES THE SAME FUNCTION WORK IN "METHODS" BUT NOT IN "COMPUTED"??
//            scrollDown: function() {
//            $('#browseButton').click(function(){ // gets the id in html file 
//            alert("works?")
//            $('html,body').animate({ // it will animate all html body 
//            scrollTop: $('#tableContainer').offset().top}, 'slow'); // get the other id where you want the page to scroll to. then offset the page and slow the animation.the only options available to offset are top and left for some reason.     
//                });
//            }
     },

})
    

//var app = new Vue({
//        el: '#vueApp',
//        data: {
//            members: [],
//            allMembers: [],//backup array;will have the same content as "members", but it doesn't get played with
//            states: [],
//            showVue: false 
//        },
//        
//        created: function(){ //I initialize the page calling "getData", which makes the starting table 
//            this.getData();
//        },
//        
//        methods: {
//            
//            getData : function () {
//                var url;
//                if(document.getElementById("senate_page")){
//                    url = "https://api.myjson.com/bins/v79hh"
//                }
//                if(document.getElementById("house_page")){
//                    url = "https://api.myjson.com/bins/w5j7d"
//                }
//                $.getJSON(url, function(obj){
//                console.log("now I have the data")
//                app.members = obj.results[0].members; // so i get the array "members" from the JSON url
//                app.allMembers = app.members; // here is set the content of "allMembers" to the one of "members"
//                app.members.forEach(function(oneGuy){ //I fill the "state" array
//                    if(!app.states.includes(oneGuy.state)){
//                    app.states.push(oneGuy.state)
//                    }
//                })
//                app.states.sort()//I sort the "states" array
//                //the following condition is to hide the Vue element untile the data are loaded;see HTML
//                if (app.members.length > 0){
//                app.showVue = true;
//                }
//                console.log(app.members)
//                console.log(app.states)
//                })
//            },
//            















