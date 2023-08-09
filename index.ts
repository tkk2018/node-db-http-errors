import {
  CheckViolationError,
  DBError,
  DataError,
  ForeignKeyViolationError,
  NotNullViolationError,
  UniqueViolationError,
} from "db-errors";
import httpstatus from "http-status";

interface DbHttpStatus {
  status_code: number;
  status_message: string;
  db_error: DBError;
};

export function dbHttpStatus(err: DBError, use409?: boolean): DbHttpStatus {
  if (err instanceof UniqueViolationError
    || err instanceof ForeignKeyViolationError
  ) {
    const status_code = use409 ? 409: 403;
    return {
      status_code,
      status_message: httpstatus[status_code],
      db_error: err,
    };
  }
  else if (err instanceof NotNullViolationError
    || err instanceof CheckViolationError
    || err instanceof DataError
  ) {
    return {
      status_code: 400,
      status_message: httpstatus[400],
      db_error: err,
    };
  }
  else {
    return {
      status_code: 500,
      status_message: httpstatus[500],
      db_error: err,
    };
  }
};
