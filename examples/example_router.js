/* Author: RossCairns.com

*/


// Imports
var Router = W.route.Router;

$(document).ready(function () {
    W.l("================");
    W.l("In console type:");
    W.l("    Router.dispatch('');");
    W.l("    Router.dispatch('/ross/');");
    W.l("    Router.dispatch('/dude'/);");
    W.l("    Router.dispatch('/about/me/');");
    W.l("    Router.dispatch('/project/fish/chips/');");
    W.l("================");

    // Routes
    //
    Router.map("").to(function(){
        W.l("home");
    });
    Router.map("/ross/").to(function(){
        W.l("ross");
    });
    Router.map("/ross/:page/").to(function(){
        W.l("ross with page:" + this.params['page']);
    });
    Router.map("/:page/").to(function(){
         W.l("base page: " + this.params['page']);
    });
    Router.map("/about/:page/").to(function(){
         W.l("about page: " + this.params['page']);
    });
    Router.map("project/:type").to(function(){
         W.l("project type: " + this.params['type']);
    });
    Router.map("project/:type/:project").to(function(){
         W.l("project type: " + this.params['type'] + " project: " + this.params['page']);
    });


});