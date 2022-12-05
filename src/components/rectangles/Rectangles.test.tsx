import { render } from '@testing-library/react';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { mockClient, mockRectangles } from '../../api/api';
import { ClientContextProvider } from '../../contexts/client';
import { Rectangles } from './Rectangles';

let container: any = null;
describe('Rectangles', () => {
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        localStorage.clear()
    });
    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        localStorage.clear()
    });
    it('Should call api for fist render', () => {
        const spy = jest.spyOn(mockClient, 'getRectangles')
        render(<ClientContextProvider value={mockClient}><Rectangles /></ClientContextProvider>, container)
        expect(spy).toHaveBeenCalled()
    })
    it('Should not call api if data is in the localStorage', () => {
        localStorage.setItem('rectangles', JSON.stringify(mockRectangles))
        const spy = jest.spyOn(mockClient, 'getRectangles')
        act(() => render(<ClientContextProvider value={mockClient}><Rectangles /></ClientContextProvider>, container))
        expect(spy).toBeCalledTimes(0)
    })
    it("Should get data from server if it is passed one week", () => {
        jest.useFakeTimers()
        const spy = jest.spyOn(mockClient, 'getRectangles')
        localStorage.setItem('lastUpdated', JSON.stringify(new Date()))
        localStorage.setItem('rectangles', JSON.stringify(mockRectangles))
        const { unmount } = render(<ClientContextProvider value={mockClient}><Rectangles /></ClientContextProvider>, container)
        unmount()
        setTimeout(() => {
            render(<ClientContextProvider value={mockClient}><Rectangles /></ClientContextProvider>, container)
        }, 1000 * 3600 * 24 * 7)
        jest.advanceTimersByTime(1000 * 3600 * 24 * 7)
        expect(spy).toBeCalledTimes(1)
    })
})