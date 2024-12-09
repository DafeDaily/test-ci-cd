// Importing the util module to polyfill TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from 'util';

// Assign these to the global object
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import '@testing-library/jest-dom/matchers'


// Import custom matchers from jest-dom for extended assertions on DOM nodes
import '@testing-library/jest-dom';  // Adds matchers like .toBeInTheDocument()

// Mock timers (if your tests involve setTimeout, setInterval, etc.)
jest.useFakeTimers();

// If you need to set up global variables for the tests
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve([]) }));

// Optionally, set up or mock other global objects or functionalities you need
