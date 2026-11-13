'use client';

import React from 'react';

export function AdminTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
}) {
  return (
    <div
      className="admin-table overflow-x-auto"
      style={{
        border: '1px solid var(--line)',
        background: 'var(--panel)',
        borderRadius: 'var(--r-lg)',
      }}
    >
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr
            style={{
              background: 'rgba(6, 7, 14, 0.7)',
              borderBottom: '1px solid var(--line)',
            }}
          >
            {columns.map((column) => (
              <th
                key={column}
                className="px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.18em]"
                style={{ color: 'var(--muted-deep)' }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="transition-all duration-200"
              style={{ borderBottom: '1px solid var(--line-soft)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-5 py-4 text-[13px]"
                  style={{ color: 'var(--paper-dim)' }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
