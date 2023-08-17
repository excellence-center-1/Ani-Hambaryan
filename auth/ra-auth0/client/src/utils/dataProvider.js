//dtaProvider.js

import { DataProvider } from "react-admin";
import fakerestDataProvider from "ra-data-fakerest"

export const dataProvider = fakerestDataProvider({
    resource: [],
});