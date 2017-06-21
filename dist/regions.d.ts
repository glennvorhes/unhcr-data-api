/**
 * Created by glenn on 6/20/17.
 */
import { iError } from './config';
export declare module regions {
    interface iSettlementBase {
        name: string;
        updated_at: string;
    }
    interface iSettlement extends iSettlementBase {
        latitude: number;
        longitude: number;
    }
    interface iRegionBase {
        name: string;
        country: string;
    }
    interface iRegion extends iRegionBase {
        settlements: iSettlement[];
    }
    const show: (regionId: string, callback: (d: iRegion[]) => any, error?: (e: iError) => any) => void;
}
