/**
 * Represents an item in the system
 */
export interface LoanApplication {
    id: number;
    applicant: string;
    amount: number;
    status: "pending" | "under_review" | "flagged" | "approved" | "rejected";
    createdAt: string;
}