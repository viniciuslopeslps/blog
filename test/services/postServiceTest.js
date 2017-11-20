var assert = require('assert');
var postService = require("../../app/services/postService.js");
var moment = require("moment");
var _ = require('underscore');

var body = {
    smallTitle: "small",
    bigTitle: "big",
    about: "about",
    fullText: "text"
}

describe('post service class', () => {

    describe('createPostTest', () => {
        it('should save a new post', function () {

            postService.createPost(body,1).then(created => {
                assert.equal(created.smallTitle, 'small');
                assert.equal(created.bigTitle, 'big');
                assert.equal(created.about, 'about');
                assert.equal(created.fullText, 'text');
                assert.equal(created.userId, 1);

                postService.deletePost(1, created.id);                
            });
        })
    });

    describe('findLastPostsTest', () => {
        it('should find the new post', function () {

            postService.createPost(body,1).then(created => {
   
                postService.findLastPosts().then(lasts =>{
                    var match = _.find(lasts, function(last){ return last.id === created.id; });
                    assert.equal(match.smallTitle, 'small');
                    assert.equal(match.bigTitle, 'big');
                    assert.equal(match.about, 'about');
                    assert.equal(match.fullText, 'text');
                    assert.equal(match.userId, 1);
                    postService.deletePost(1, match.id);                
                })
            });
        })
    });

    describe('findAllByDateTest', () => {
        it('should find the new post by date', function () {

            postService.createPost(body,1).then(created => {
   
                postService.findAllByDate(moment().format('YYYY'), moment().format('MM')).then(lasts =>{
                    var match = _.find(lasts, function(last){ return last.id === created.id; });
                    assert.equal(match.smallTitle, 'small');
                    assert.equal(match.bigTitle, 'big');
                    assert.equal(match.about, 'about');
                    assert.equal(match.fullText, 'text');
                    assert.equal(match.userId, 1);
                    postService.deletePost(1, match.id);                
                })
            });
        })
    });

});

