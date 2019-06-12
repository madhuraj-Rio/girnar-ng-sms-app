export interface Company {
    id: number;
    name: number;
    email: string;
    mobile: string;
    status: number;
    settings: string;
    param: string;
    mapped_product: string;
}
export class Division {
    id: number;
    name: string;
    isSecret = false;
}
export class Entities {
    id: number;
    name: string;
    isSecret = false;
}
export class Sources {
    vid: number;
    source_name: string;
    bu_name: string;
    bu_spoc_name: string;
    bu_spoc_email: string;
    bu_spoc_mobile: number;
    source_api_key: string;
    source_ip_addresses: string;
    source_sms_daily_quota: number;
}

export class Senders {
    sender_label: string;
    sender_desc: string;
    sender_vendors: string;
    created_by: number;
    created_date: string;
}

export class Vendors {
    vendor_name: string;
    vendor_address: string;
    vendor_email: string;
    vendor_mobile: number;
    vendor_website: string;
    vendor_spoc_name: string;
    vendor_spoc_mobile: number;
    vendor_spoc_email: string;
    vendor_tech_name: string;
    vendor_tech_mobile: number;
    vendor_tech_email: string;
    vendor_support_email: string;
    vendor_invoice_email: string;
    vendor_dispute_email: string;
}
export class Configs {
    
}