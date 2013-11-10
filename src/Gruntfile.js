module.exports = function (grunt) {
    var mustache = require('./mustache.js');
    var template = grunt.file.read('./templates/member.html');
    var outdir = '../static/';
    var membersdir = 'members/';
    grunt.task.registerTask('members', 'create members.json', function () {
        grunt.log.writeln('-------');
        grunt.log.writeln(outdir);
        grunt.log.writeln(membersdir);
        var member_file_list = grunt.file.expand(membersdir + "*.json");
        var i;
        var members = [];
        var output = {
            "row": []
        };
        var row = {
            "col": []
        };
        var member = {};
        for (i = 0; i < member_file_list.length; i++) {
            grunt.log.writeln("reading file:" + member_file_list[i]);
            member = grunt.file.readJSON(member_file_list[i]);
            if (row.col.length < 3) {
                row.col.push(member);
            } else {
                output.row.push(row);
                row = {
                    "col": []
                };
                row.col.push(member);
            }
        }
        if (row.col.length > 0) output.row.push(row);
        output = mustache.render(template, output);
        grunt.file.write(outdir + "members.html", output);
    });
    grunt.task.registerTask('members-image','copy images',function(){
        var image_list = grunt.file.expand(membersdir + "*.jpg",membersdir+"*.png");
        var i;
        for(i=0;i<image_list.length;i++){
            grunt.file.copy(image_list[i],outdir+image_list[i]);
        }
    });
};