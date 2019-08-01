import * as React from "react";
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { MyFriends }  from "./index";

const waitForAsync = () => new Promise(resolve => setTimeout(resolve, 1))

let container: Element;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test('should have loading state & 2 friends once loaded without their statuses', async () => {
  act(() => {
    ReactDOM.render(<MyFriends />, container);
  });

  expect(container.querySelector(".loader").textContent).toBe('Loading...');

  await waitForAsync();

  expect(container.querySelectorAll(".loader")).toHaveLength(0);
  expect(container.querySelectorAll("li")).toHaveLength(2);
  expect(container.querySelectorAll(".name")[0].textContent).toBe('Hao Tran');
  expect(container.querySelectorAll(".name")[1].textContent).toBe('Duong Phan');
  expect(container.querySelectorAll('.status')).toHaveLength(0);
});

test('should check status (online/offline) of each friend as clicking each', async () => {
  act(() => {
    ReactDOM.render(<MyFriends />, container);
  });

  await waitForAsync();

  const friends = container.querySelectorAll('li');

  act(() => {
    friends[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    friends[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  await waitForAsync();

  expect(friends[0].querySelector('.status').textContent).toBe('Online');
  expect(friends[1].querySelector('.status').textContent).toBe('Offline');
});
