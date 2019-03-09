import View from "/View/View.js";

View.stylesheet("https://use.fontawesome.com/releases/v5.7.2/css/all.css");

export default function icon(str){
	return new View().add_class("fas fa-" + str);
}