import React from 'react';
import { act } from 'react-dom/test-utils';
import { render } from '@testing-library/react';
import { PrefProvider, getEventListener, MarqueeEvents } from '@vscode-marquee/utils';

import wrapper from '../src/components/WidgetWrapper';

test('renders component correctly', async () => {
  const listener = getEventListener<MarqueeEvents>();
  const dragHandle = <div>DragHandle</div>;
  const Widget = wrapper((...props: any[]) => <div {...props}>hello world</div>);
  const { queryByText } = render(
    <PrefProvider>
      {/* @ts-expect-error */}
      <Widget name="testWidget" dragHandle={dragHandle}>
        <div>fooloo</div>
      </Widget>
    </PrefProvider>
  );
  expect(queryByText('hello world')).toBeTruthy();
  expect(queryByText('DragHandle')).toBeTruthy();
  act(() => { listener.emit('updateWidgetDisplay', { testWidget: false }); });

  expect(queryByText('hello world')).not.toBeTruthy();
  expect(queryByText('DragHandle')).not.toBeTruthy();
});
