export {};

declare global {
  interface Contact {
    avatar: string;
    name: string;
  }
  interface Deal {
    id: string;
    title: string;
    logo: string;
    url: string;
    contacts: Contact[];
    activities: string[];
    reminder: string;
    notes: string[];
  }

  interface Column {
    id: string;
    title: string;
    color: string;
    deals: Deal[];
  }

  interface Board {
    id: string;
    title: string;
    columns: Column[];
  }
}
