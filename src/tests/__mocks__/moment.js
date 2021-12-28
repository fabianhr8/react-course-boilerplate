// Here we'll make a mock moment for testing
// We cannot import moment normally since it would only call the mocked moment

const moment = require.requireActual('moment');

export default (timestamp = 0) => {
    return moment(timestamp);
};