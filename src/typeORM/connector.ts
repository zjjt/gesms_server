import {AllConnections} from "./allConnections/AllConnections";

const makeDBconnexion = async() => {
    // here we await all types of connection needed for the app to work
    await AllConnections();
}
export default makeDBconnexion;