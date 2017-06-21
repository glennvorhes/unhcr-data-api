/**
 * Created by glenn on 6/19/17.
 */
import { iError } from './config';
export declare module instances {
    interface iInstances {
        instances: string[];
    }
    const list: (callback: (d: iInstances) => any, error?: (e: iError) => any) => void;
    interface iShowId {
        name: string;
        type: string;
        site_name: string;
        application_path: string;
        url: string;
        updated_at: string;
        countries: {
            [s: string]: string;
        };
    }
    const show: (instanceId: string, callback: (d: iShowId) => any, error?: (e: iError) => any) => void;
}
