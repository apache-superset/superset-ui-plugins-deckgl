import React, { useMemo, CSSProperties } from 'react';
import { filterXSS } from 'xss';

export type TooltipProps = {
  tooltip:
    | {
        x: number;
        y: number;
        content: string;
      }
    | null
    | undefined;
};

export default function Tooltip(props: TooltipProps) {
  const { tooltip } = props;
  if (typeof tooltip === 'undefined' || tooltip === null) {
    return null;
  }

  const { x, y, content } = tooltip;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const style: CSSProperties = useMemo(
    () => ({
      position: 'absolute',
      top: `${y}px`,
      left: `${x}px`,
      padding: '8px',
      margin: '8px',
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      maxWidth: '300px',
      fontSize: '12px',
      zIndex: 9,
      pointerEvents: 'none',
    }),
    [x, y],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contentNode = useMemo(
    () =>
      typeof content === 'string' ? (
        <div // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: filterXSS(content, { stripIgnoreTag: true }),
          }}
        />
      ) : (
        content
      ),
    [content],
  );

  return <div style={style}>{contentNode}</div>;
}
