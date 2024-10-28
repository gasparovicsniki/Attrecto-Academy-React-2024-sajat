// TableView.tsx
import React from "react";
import { BadgeModel } from "../../models/badges.model";

interface TableViewProps {
  badges: BadgeModel[];
}

const TableView: React.FC<TableViewProps> = ({ badges }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {badges.map((badge) => (
        <tr key={badge.id}>
          <td>{badge.id}</td>
          <td>{badge.name}</td>
          <td>{badge.description}</td>
          <td>{new Date(badge.createAt).toLocaleDateString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableView;
