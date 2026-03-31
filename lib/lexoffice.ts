const BASE_URL = "https://api.lexoffice.io/v1";

function getHeaders() {
  const apiKey = process.env.LEXOFFICE_API_KEY;
  if (!apiKey) throw new Error("LEXOFFICE_API_KEY ist nicht konfiguriert.");
  return {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
}

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

export interface LexofficeVoucherItem {
  id: string;
  voucherType: string;
  voucherStatus: string;
  voucherNumber: string;
  voucherDate: string;
  dueDate: string | null;
  contactName: string;
  totalGrossAmount: number;
  currency: string;
  openAmount: number;
}

export interface LexofficeVoucherList {
  content: LexofficeVoucherItem[];
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  numberOfElements: number;
  size: number;
  number: number;
}

export interface LexofficeLineItem {
  id: string | null;
  type: string;
  name: string;
  description: string | null;
  quantity: number;
  unitName: string;
  unitPrice: { currency: string; netAmount: number; grossAmount: number; taxRatePercentage: number };
  lineItemAmount: number;
}

export interface LexofficeTaxAmount {
  taxRatePercentage: number;
  taxAmount: number;
  netAmount: number;
}

export interface LexofficeTotalPrice {
  currency: string;
  totalNetAmount: number;
  totalGrossAmount: number;
  totalTaxAmount: number;
}

export interface LexofficeAddress {
  contactId: string | null;
  name: string;
  street: string | null;
  city: string | null;
  zip: string | null;
  countryCode: string;
}

export interface LexofficeInvoice {
  id: string;
  organizationId: string;
  createdDate: string;
  updatedDate: string;
  version: number;
  language: string;
  archived: boolean;
  voucherStatus: string;
  voucherNumber: string;
  voucherDate: string;
  dueDate: string | null;
  address: LexofficeAddress;
  lineItems: LexofficeLineItem[];
  totalPrice: LexofficeTotalPrice;
  taxAmounts: LexofficeTaxAmount[];
  files: { documentFileId: string } | null;
}

// ─── API Functions ──────────────────────────────────────────────────────────

export async function getInvoices(contactName?: string): Promise<LexofficeVoucherList | null> {
  try {
    const params = new URLSearchParams({
      voucherType: "invoice",
      voucherStatus: "open,paid,overdue,draft",
      sort: "voucherDate,DESC",
      size: "100",
    });
    if (contactName) params.set("contactName", contactName);

    const res = await fetch(`${BASE_URL}/voucherlist?${params}`, {
      headers: getHeaders(),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getInvoiceById(id: string): Promise<LexofficeInvoice | null> {
  try {
    const res = await fetch(`${BASE_URL}/invoices/${id}`, {
      headers: getHeaders(),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getInvoicePdfBuffer(documentFileId: string): Promise<Buffer | null> {
  try {
    const res = await fetch(`${BASE_URL}/files/${documentFileId}`, {
      headers: {
        Authorization: `Bearer ${process.env.LEXOFFICE_API_KEY}`,
        Accept: "application/pdf",
      },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    return Buffer.from(arrayBuffer);
  } catch {
    return null;
  }
}
