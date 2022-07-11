// Test create a object to see if GAS supports this
class Show {
    constructor(id) {
        this.id = id        
    }

    setName(name) {
        this.name = name
    }

    setCFEOpenDate(date) {
        this.cfeopendate = date
    }

    setCFECloseDate(date) {
        this.cfeclosedate = date
    }

    getId() {
        return this.id
    }

    getName() {
        return this.name
    }
}
