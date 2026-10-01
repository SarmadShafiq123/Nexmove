export const LEAD_STATUS = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified',
  REJECTED: 'rejected'
};

export const TRUCK_TYPES = {
  SEMI_TRUCK: 'Semi Truck',
  DRY_VAN: 'Dry Van',
  REEFER: 'Reefer',
  FLATBED: 'Flatbed',
  STEP_DECK: 'Step Deck',
  BOX_TRUCK: 'Box Truck',
  HOTSHOT: 'Hotshot',
  POWER_ONLY: 'Power Only',
  CONESTOGA: 'Conestoga',
  RGN: 'RGN',
  OTHER: 'Other'
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const RATE_LIMIT_CONFIG = {
  LEAD_SUBMISSION: {
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many requests from this IP, please try again after 15 minutes'
  },
  GENERAL: {
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later'
  }
};

export const CORS_OPTIONS = {
  development: ['http://localhost:5173', 'http://localhost:3000'],
  get production() {
    return process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];
  }
};
