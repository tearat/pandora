function Pandora() {
    this.box = [];
    this.show_all_tables = () => { 
        list = "";
        for (var k in box) {
            if (box.hasOwnProperty(k)) {
               list += "`"+k+"` ";
            }
        }
        console.info( "Pandora: All tables: %s",list ) 
    };
    this.count_tables = () => {
        var count = 0;
        for (var k in box) {
            if (box.hasOwnProperty(k)) {
               ++count;
            }
        }
        return count;
    };
    // ============== ADD NEW TABLE
    this.box = (table, cols=false) => { 
        if (this.box[table]) {
            console.error("Pandora: Unable to add table `%s` to box due it's already exists.", table)
        } else {
            var entry = {};
            entry.table = table;
            entry.blueprint = [];
            entry.blueprint.push("id");
            for (var i in cols) {
                entry.blueprint.push(cols[i])
            };
            entry.data = [];
            this.box[table] = entry;
            console.info("Pandora: New table `%s` was created.", table);
            
            // ============== Binding the `insert` method to tables
            this.box[table].insert = (data) => {
                if ( data.length != this.box[table].blueprint.length ) {
                    console.error("Pandora: Unable to add row to `%s` due numbers of expected parameters does not match.", table);
                } else {
                    // Generate new ID
                    var new_id;
                    if (this.box[table].data.length == 0) {
                        new_id = 1;
                    } else {
                        var length = this.box[table].data.length;
                        var last_item = this.box[table].data[length-1].id;
                        new_id = last_item+1;
                    }
                    // ===================

                    // Bind new values for ENTRY
                    var entry = {}; // новый пустой объект
                    var blueprint = this.box[table].blueprint;
                    for (var i in blueprint) {
                        if (i==0) {
                            entry.id = new_id;
                        } else {
                            var key = blueprint[i];
                            entry[key] = data[i];
                        }
                    }
                    // ===================
                }

                this.box[table].data.push(entry);
                console.info("Pandora: Data inserted into `%s` table: "+data, table);
            };
            
            // ============== Binding the `find` method to tables
            this.box[table].find = (value, col = "id") => {
                for (var k in this.box[table].data) {
                    if (this.box[table].data[k][col] == value) {
                        return k;
                    }
                }
            }
            
            // ============== Binding the `read` method to tables
            this.box[table].read = (value, col = "id") => {
                for (var k in this.box[table].data) {
                    if (this.box[table].data[k][col] == value) {
                        data = this.box[table].data[k];
                    }
                }
                return data;
            }
            
            // ============== Binding the `update` method to tables
            this.box[table].update = (id, data, cols) => {
                var pos = this.box[table].find(id);
                if (!this.box[table].data[pos]) {
                    console.error("Pandora: Update in `%s` aborted. Row with id = %s is not exist.", this.box[table].title, id);
                } else {
                    if (Array.isArray(data) && Array.isArray(cols)) {
                        for (var k in data) {
                            this.box[table].data[pos][cols[k]] = data[k];
                        }
                        console.info( "Pandora: `%s`[%s] updated. (%s -> %s)",table,id,data,cols ) 
                    } else if (!Array.isArray(data) && !Array.isArray(cols)) {
                        this.box[table].data[pos][cols] = data;
                        console.info( "Pandora: `%s`[%s] updated. (%s -> %s)",table,id,data,cols ) 
                    } else {
                        console.error("Pandora: Update `%s` aborted. Expected parameters are not correct.", this.box[table].title);
                    }
                }
            }
            
            // ============== Binding the `delete` method to tables
            this.box[table].delete = (value, col = "id") => {
                var pos = this.box[table].find(value, col);
                if ( this.box[table].data[pos] ) {
                    this.box[table].data.splice(pos,1);
                    console.info("Pandora: Deleted data in `%s`[%s].", this.box[table].table,value);
                } else {
                    console.error("Pandora: Deletion in `%s` aborted. Row with id = %s is not exist.", this.box[table].title, value);
                }
            }
            // =================== ============== ==============
        }
    };
}