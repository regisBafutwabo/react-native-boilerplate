import enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-styled-components";

enzyme.configure({ adapter: new Adapter() });

const mockReturnValues = {
    arrayOne: JSON.stringify(["red", "blue"]),
    objectOne: JSON.stringify({
        isATest: true,
        hasNestedData: {
            ohYeah: "it's true",
        },
    }),
    stringOne: JSON.stringify("testing string"),
};

function mockMultiGetTestData() {
    return [
        ["key1", JSON.stringify({ valor: 1 })],
        ["key2", JSON.stringify({ valor: 2 })],
    ];
}

jest.mock("@react-native-community/async-storage", () => ({
    setItem: jest.fn(() => {
        return new Promise(resolve => {
            resolve(null);
        });
    }),
    multiSet: jest.fn(() => {
        return new Promise(resolve => {
            resolve(null);
        });
    }),
    getItem: jest.fn(key => {
        return new Promise(resolve => {
            if (mockReturnValues[key]) {
                resolve(mockReturnValues[key]);
            } else {
                resolve(null);
            }
        });
    }),
    multiGet: jest.fn(() => {
        return new Promise(resolve => {
            resolve(mockMultiGetTestData());
        });
    }),
    removeItem: jest.fn(() => {
        return new Promise(resolve => {
            resolve(null);
        });
    }),
    getAllKeys: jest.fn(() => {
        return new Promise(resolve => {
            resolve(["one", "two", "three"]);
        });
    }),
    multiRemove: jest.fn(() => ({
        then: jest.fn(),
    })),
}));
