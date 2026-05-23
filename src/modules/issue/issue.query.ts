import { pool } from "../../config/db";
import type { IIssue } from "./issue.interface";

const createIssueQuery = async (
  payload: Omit<IIssue, "id" | "created_at" | "updated_at">,
) => {
  const { title, description, type, reporter_id } = payload;
  const sql = `
    INSERT INTO issues(title, description,type,reporter_id)
    VALUES($1,$2,$3,$4)
    RETURNING *
    `;
  const result = await pool.query(sql, [title, description, type, reporter_id]);
  return result.rows[0];
};

// Get All issues

const getAllIssues = async (filters: {
  type?: string;
  status?: string;
  sort?: string;
}) => {
  const conditions: string[] = [];
  const values: string[] = [];

  let sql = `
    SELECT * FROM issues
    `;

  // type filter

  if (filters.type) {
    values.push(filters.type);
    conditions.push(`type = $${values.length}`);
  }
  // status filter
  if (filters.status) {
    values.push(filters.status);

    conditions.push(`status = $${values.length}`);
  }

  if (conditions.length > 0) {
    sql += `
        WHERE ${conditions.join(" AND ")}
        `;
  }
  // sorting

  if (filters.sort === "oldest") {
    sql += `
        ORDER BY created_at ASC;
        `;
  } else {
    sql += `
        ORDER BY created_at DESC
        `;
  }

  const result = await pool.query(sql, values);
  return result.rows;
};

// Get issue by Id

const getIssueById = async (issueId: number) => {
  const sql = `
    SELECT * from issues
    WHERE id = $1
    `;

  const result = await pool.query(sql, [issueId]);

  return result.rows[0];
};

// Update issue by Id

const updateIssue = async (
  payload: Partial<Pick<IIssue, "title" | "description" | "type" | "status">>,
  issueId: number,
) => {
  const { title, description, type, status } = payload;
  const sql = `
    UPDATE issues
    SET
    title = COALESCE($1,title),
    description =  COALESCE($2, description),
    type = COALESCE($3,type),
    status = COALESCE($4, status),
    updated_at = NOW()
    WHERE id=$5
    RETURNING *
    `;
  const result = await pool.query(sql, [
    title,
    description,
    type,
    status,
    issueId,
  ]);

  return result.rows[0];
};
// Delete Issue by Id

const deleteIssueQuery = async (issueId: number) => {
  const sql = `
    DELETE FROM issues WHERE id = $1
    `;
  const result = await pool.query(sql, [issueId]);
  return result.rows[0];
};

export const issuesQuery = {
  createIssueQuery,
  getIssueById,
  deleteIssueQuery,
  getAllIssues,
  updateIssue,
};
