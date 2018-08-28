import { css } from 'glamor';
import classNames from 'classnames';
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

import { withStyleSet } from '../Context';
// import BasicActivity from '../Activity/BasicActivity';
import BasicActivity from '../Activity2/Activity';
import Context from '../Context';
import UnknownAttachment from '../Attachment/UnknownAttachment';

const ROOT_CSS = css({
  display: 'flex',
  flexDirection: 'column',
  WebkitOverflowScrolling: 'touch'
});

const FILLER_CSS = css({
  flex: 1
});

const LIST_CSS = css({
  listStyleType: 'none'
});

export default withStyleSet(({ className, children, styleSet }) =>
  <ScrollToBottom
    className={ className }
    threshold={ styleSet.options.scrollToBottomThreshold }
    scrollViewClassName={ ROOT_CSS + '' }
  >
    <div className={ FILLER_CSS } />
    <Context.Consumer>
      { ({ activities }) =>
        <ul className={ classNames(LIST_CSS + '', styleSet.activities + '') }>
          {
            activities.map((activity, index) =>
              <li
                className={ styleSet.activity }
                key={ index }
              >
                <BasicActivity activity={ activity }>
                  {
                    card => {
                      try {
                        return children && children(card) || <UnknownAttachment message="No renderer for this card">{ JSON.stringify(card, null, 2) }</UnknownAttachment>;
                      } catch (err) {
                        return (
                          <UnknownAttachment message="Failed to render card">
                            <pre>{ JSON.stringify(card, null, 2) }</pre>
                            <br />
                            <pre>{ err.stack }</pre>
                          </UnknownAttachment>
                        );
                      }
                    }
                  }
                </BasicActivity>
              </li>
            )
          }
        </ul>
      }
    </Context.Consumer>
  </ScrollToBottom>
)
