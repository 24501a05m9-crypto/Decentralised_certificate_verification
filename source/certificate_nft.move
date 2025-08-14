cdmodule my_addr::certificate_nft {

    use std::signer;
    use std::vector;
    use std::option;
    use std::timestamp;

    /// Certificate struct – stores immutable details
    struct Certificate has copy, drop, store {
        student_name: vector<u8>,   // Student name
        course: vector<u8>,         // Course/program name
        ipfs_cid: vector<u8>,       // IPFS hash (CID) pointing to the PDF
        issuer: address,            // College/admin address that minted
        mint_time: u64,              // Timestamp of mint
    }

    /// Global storage of certificates for the admin
    struct Certificates has key, store {
        list: vector<Certificate>, // Simple vector storage
    }

    /// Initialize once by admin
    public entry fun init_storage(admin: &signer) {
        move_to<Certificates>(
            admin,
            Certificates { list: vector::empty<Certificate>() }
        );
    }

    /// Mint a certificate NFT without token_id
    public entry fun mint_certificate(
        admin: &signer,
        student_name: vector<u8>,
        course: vector<u8>,
        ipfs_cid: vector<u8>
    ) acquires Certificates {
        let admin_addr = signer::address_of(admin);
        let certs = borrow_global_mut<Certificates>(admin_addr);
        let now = timestamp::now_seconds();

        let cert = Certificate {
            student_name,
            course,
            ipfs_cid,
            issuer: admin_addr,
            mint_time: now,
        };

        vector::push_back(&mut certs.list, cert);
    }

    /// Fetch all certificates
    public fun get_all_certificates(
        admin_addr: address
    ): vector<Certificate> acquires Certificates {
        let certs = borrow_global<Certificates>(admin_addr);
        certs.list
    }

    /// Fetch a certificate by its IPFS CID
    public fun get_certificate_by_cid(
        admin_addr: address,
        cid: vector<u8>
    ): option::Option<Certificate> acquires Certificates {
        let certs = borrow_global<Certificates>(admin_addr);
        let list_ref = &certs.list;
        let length = vector::length(list_ref);
        let i = 0;
        while (i < length) {
            let cert_ref = vector::borrow(list_ref, i);
            if (cert_ref.ipfs_cid == cid) {
                return option::some(*cert_ref);
            };
            i = i + 1;
        };
        option::none<Certificate>()
    }
}