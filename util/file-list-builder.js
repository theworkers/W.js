module.exports = FileListBuilder;

// # Filelist builder
function FileListBuilder ( parent ) {

    this.files = [];

    this.directory = null;

    this.addFile = function ( file ) {
        this.files.push( file );
        return this;
    };

    // Adds a directory of files 
    this.push = function ( directory ) {
        var child = new FileListBuilder( this );
        this.files = this.files.concat( [ directory+'_.header.js', directory+'*.js' ] );
        child.directory = directory;
        return child;
    };

    this.pop = function () {
        if ( this.directory ) {
            this.files = this.files.concat( ['!'+this.directory+'_.footer.js', this.directory+'_.footer.js' ]  );
        }
        if ( parent ) {
            parent.files = parent.files.concat( this.files );
        }
        return parent;
    };

    this.get = function () {
        return this.files;
    };
}