import { Component, OnInit } from '@angular/core';
import { AuditTrailManagementService } from './audit-trail-management.service';

@Component({
  selector: 'app-audit-trail-management',
  templateUrl: './audit-trail-management.component.html',
  styleUrls: ['./audit-trail-management.component.css']
})
export class AuditTrailManagementComponent implements OnInit {
  auditTrailData: any[] = [];

  constructor(private auditTrailService: AuditTrailManagementService) {}

  ngOnInit(): void {
    this.getAuditTrailData();
  }

  getAuditTrailData(): void {
    this.auditTrailService.getAuditTrailData().subscribe(
      (data: any[]) => {
        this.auditTrailData = data;
      },
      error => {
        console.error('Error fetching auditTrailData:', error);
      }
    );
  }
}
